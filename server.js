import { config } from './config.js';
import http from "http";
import url from "url";
const PORT = process.env.SERVER_PORT || config.SERVER_PORT;
let isAllPrimes = true;
let numbersToReturn = [];
let numOfPrimes = 0;

http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");

    const { pathname, query } = url.parse(request.url, true);
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
        });

    request.on('end', () => {

        if(request.method === 'POST' && pathname === "/api/numbers/prime/validate") {
            Object.keys(JSON.parse(data)).forEach( (key) => {
                if(!isRishoni(JSON.parse(data)[key], JSON.parse(data)[key] - 1))
                    isAllPrimes = false;
            });
            console.log(isAllPrimes.toString());
            response.write(isAllPrimes.toString());
        }

        else if(request.method === 'GET' && pathname === "/api/numbers/prime") {
            for(let num = 1; numOfPrimes <= query.amount; num++)
            {
                if(isRishoni(num, num - 1))
                {
                    numbersToReturn.push(num);
                    numOfPrimes++;
                }
            }
            console.log(numbersToReturn.join());
            response.write(numbersToReturn.join());
        }
        
        else
            console.log("error")
    });
        
    response.end();
}).listen(PORT);

function isRishoni(num, numMinusOne) {

    if(numMinusOne == 0 || numMinusOne == 1)
        return true;

    if(num % numMinusOne == 0)
        return false;
        
    return isRishoni(num, numMinusOne - 1);
}
