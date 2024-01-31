import { readFile } from 'fs/promises'
import { redisCache } from '../../libs/redis.utils.js';

const provincesData = 'src/data/provinces.json';
const regenciesData = 'src/data/regencies.json';

export class FetchingData {
    static provinces = async (req, res) => {
        const data = await readFile(provincesData, 'utf-8')
        if (data) {
            redisCache('set', 'province', data)
        }
        res.status(200).json({
            status: 'OK',
            code: 200,
            result: JSON.parse(data)
        })
    }
    static cities = async (req, res) => {
        const rawData = await readFile(regenciesData, 'utf-8')
        const result = JSON.parse(rawData).filter(e => e.pid === req.params.pid)
        if (result.length !== 0) {
            redisCache('set', `city:${req.params.pid}`, result)
        }
        res.status(200).json({
            status: 'OK',
            code: 200,
            result: result
        })

    }
}