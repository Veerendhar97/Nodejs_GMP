
import { createInterface } from 'readline';
import { writeFile, createReadStream, appendFile } from 'fs';
import { join } from 'path';
import { EOL } from 'os';
import csv from 'csvtojson';

const csvFilePath = 'files/info.csv';

const convertIntoJSON = () => {
    return new Promise((resolve, reject) => {
        csv({ ignoreEmpty: true, downstreamFormat: 'line' })
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                writeFile(join(__dirname,'./JSONfile.json'), JSON.stringify(jsonObj), (err) => {
                    if (err) {
                        reject('failed')
                    }
                    resolve('success')
                })
            })
    })
}

const writeToTextFile = async () => {
    try {
        const response = await convertIntoJSON();
        if (response === 'success') {
            const fileStream = createReadStream(join(__dirname,'./JSONfile.json'));
            const readFile = createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            for await (const line of readFile) {
                const readData = JSON.parse(line);
                for (let data of readData) {
                    console.log(JSON.stringify(data))
                    appendFile(join(__dirname,'./outputText.txt'), JSON.stringify(data) + EOL, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            }
        }
    } catch (error) {
        console.log('Error', error)
    }
}

writeToTextFile();