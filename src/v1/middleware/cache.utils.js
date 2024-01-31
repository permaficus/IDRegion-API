import { redisClient } from "../../libs/redis.utils.js";

export const readFromCache = (config = { ttl: 10080, cacheReferences: null, requestUpdate: true }) => {
    return async (req, res, next) => {
        const redis = await redisClient(); 
        let keyFormat = {
            ...req.params.pid ? { format: `city:${req.params.pid}`} : { format: 'province' },
        }
        const objectKey = keyFormat.format
        /**
         * for whatever reason if the object key is empty or undefined, go to next controller
         */
        if (!objectKey) {
            next();
            return;
        }
        /** -------------------------------------------------------------------------------- */
        let cachedData = await redis.get(objectKey)
        if (cachedData) {
            res.status(200).json({
                status: 'OK',
                cache: 'HIT',
                code: 200,
                result: JSON.parse(cachedData)
            }).end()
            return;
        }
        
        next()
    }
}