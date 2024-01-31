import { readFile } from 'fs/promises'
import { redisCache } from '../../libs/redis.utils.js';

const provincesData = 'src/data/provinces.json';
const regenciesData = 'src/data/regencies.json';

export const FetchingData = async (req, res) => {
    const { model, pid } = req.params
    if (!model || !pid) {
        res.status(400).json({
            status: 'ERR_BAD_REQUEST',
            code: 400,
            message: `Request doesn't meet our standard requirement`
        }).end()
        return
    }

    try {
        const read = {
            ...model == 'province' 
                ? { data: await readFile(provincesData, 'utf-8'), fileName: 'provinces' } 
                : { data: await readFile(regenciesData, 'utf-8'), fileName: 'city' }
        }
        if (read.data) {
            model == 'province' ? await redisCache('set', read.fileName, read.data) : await redisCache('set', `${read.fileName}:${pid}`, read.data)
        }
        res.status(200).json({
            status: 'OK',
            code: 200,
            result: model == 'province' ? JSON.parse(read.data) : JSON.parse(read.data).filter(e => e.pid === pid)
        })
    } catch (error) {
        res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            code: 500,
            message: error.message
        }).end();
        return
    }
}