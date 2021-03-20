const readLine = require('readline');

const log = console.log;

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const infiniteRead = () => {
    readline.question(`Plz enter some input.....\n`, input => {
        if (input === '') {
            readline.close();
        }
        else {
            const reversedInput = `${input.trim().split('').reverse().join('')}`;
            log('The reverse of input is:  ', reversedInput);
            infiniteRead();
        }
    });
}

infiniteRead();