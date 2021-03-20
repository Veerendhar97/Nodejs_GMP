const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = 'files/info.csv';
const logFilePath = 'Homework_1/log_1.txt';

const readFromCsv = fs.createReadStream(csvFilePath);
const writeToLog = fs.createWriteStream(logFilePath);

readFromCsv.pipe(csv()).pipe(writeToLog);
