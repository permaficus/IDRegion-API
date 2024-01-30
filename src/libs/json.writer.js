import { writeFile, access, unlink } from 'fs/promises'
import fs from 'fs'
import { parse } from 'csv-parse'
import chalk from 'chalk'

export const generateJsonFile = async () => {
    const path = 'src/data'
    const files = ['provinces', 'regencies']
    const isFileExist = async (filename) => {
        try {
            await access(`${path}/${filename}.json`)
            return true
        } catch (error) {
            return false                
        }
    }
    files.map( async (file) => {
        let rawData = []
        if (await isFileExist(file)) {
            await unlink(`${path}/${file}.json`)
        }
        fs.createReadStream(`${path}/${file}.csv`)
            .pipe(parse({ delimiter: ',', from_line: 1 }))
            .on("data", row => {
                rawData = [...rawData, { 
                    ...file == 'provinces' ? { id: row[0], province: row[1] } : { rid: row[0], pid: row[1], location: row[2] }
                }]
            })
            .on("end", async () => {
                await writeFile(`${path}/${file}.json`, JSON.stringify(rawData, null, 2), 'utf-8')
                console.log(chalk.green(`[ID-REGION] Generate ${file}.json done!..`))
            })
    })
}