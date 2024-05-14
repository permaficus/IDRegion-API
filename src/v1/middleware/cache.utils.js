import { redisClient } from "../../libs/redis.utils.js";
import { CACHING_METHOD } from "../../constant/config.js";

export const readFromCache = () => {
    return async (req, res, next) => {
        if (CACHING_METHOD === 'none') {
            next();
            return;
        }
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