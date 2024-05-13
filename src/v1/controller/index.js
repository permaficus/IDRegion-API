import { readFile } from 'fs/promises'
import { redisCache } from '../../libs/redis.utils.js';

const provincesData = 'src/data/provinces.json';
const regenciesData = 'src/data/regencies.json';

export const FetchingData = async (req, res, next) => {
    const { model, pid } = req.params
    if (!['province', 'city'].includes(model)) {
        res.status(404);
        next()
        return
    }
    if (model === 'city' && !pid) {
        res.status(400).json({
            status: 'ERR_BAD_REQUEST',
            code: 400,
            error_details: `Request doesn't meet our standard requirement`
        }).end();
    }
    let rawData = {}
    try {
        const read = {
            ...model == 'province' 
                ? { data: await readFile(provincesData, 'utf-8'), fileName: 'province' } 
                : { data: await readFile(regenciesData, 'utf-8'), fileName: 'city' }
        }
        if (read.data) {
            if (model === 'city') {
                rawData = structuredClone(JSON.parse(read.data).filter(e => e.pid === pid))

            }
            model == 'province' ? 
                await redisCache('set', read.fileName, read.data) 
                : await redisCache('set', `${read.fileName}:${pid}`, JSON.stringify(rawData))
        }
        res.status(200).json({
            status: 'OK',
            code: 200,
            result: model == 'province' ? JSON.parse(read.data) : JSON.parse(read.data).filter(e => e.pid === pid)
        })
    } catch (error) {
        res.status(500).json({
            status: 'ERR_BAD_SERVICE',
            code: 500,
            error_details: error.message
        }).end();
    }
}