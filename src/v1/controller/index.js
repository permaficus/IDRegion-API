import { readFile } from 'fs/promises'

const provincesData = 'src/data/provinces.json';
const regenciesData = 'src/data/regencies.json';

export class FetchingData {
    static provinces = async (req, res) => {
        const data = await readFile(provincesData, 'utf-8')
        res.status(200).json({
            status: 'OK',
            code: 200,
            details: JSON.parse(data)
        })
    }
    static cities = async (req, res) => {
        const rawData = await readFile(regenciesData, 'utf-8')
        const result = JSON.parse(rawData)
        res.status(200).json({
            status: 'OK',
            code: 200,
            details: result.filter(e => e.pid === req.params.pid)
        })

    }
}