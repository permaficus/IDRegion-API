import redis from 'redis'
import { REDIS_URL } from '../constant/config.js'

export const redisClient = async () => {
    const client = redis.createClient({
        url: REDIS_URL
    })
    await client.connect()
    client.on('error', err => {
        console.log(`[REDIS] ${err.message} : ${err.code}`);
    });
    client.on('reconnecting', ()=> console.log(`[REDIS] reconnecting to ${REDIS_URL}`))
    client.on('ready', ()=> console.log(`[REDIS] Connected`))
    return client
}
export const redisCache = async (options, id, data, config = { NX: false, XX: false, TTL: 10080}) => {
    const client = await redisClient();
    switch (options) {
        case 'set': {
            await client.set(id, data, {
                // NX: true,
                ...(config.NX && { NX: true, XX: false }),
                ...(config.XX && { XX: true, NX: false }),
                EX: +config.TTL
            })
            break
        }
        case 'get': {
            const result = await client.get(id)
            return result
        }
    }
}