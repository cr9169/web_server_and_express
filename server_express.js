import { config } from './config.js';
import url from "url";
import express from 'express';
const app = express();
const PORT = process.env.SERVER_PORT || config.SERVER_PORT;
let isAllPrimes = true;
let numOfPrimes = 0;
let numbersToReturn = [];
let arrayOfTenPrimes = [];

app.set('view engine', 'pug');
app.use(express.json());

app.post('/api/numbers/prime/validate', (request, response) => {
    
   const values = Object.keys(request.query).map((key) => isRishoni(req.query[key], req.query[key] - 1));
   request.send(values.reduce((prev, current) => prev && current).toString());

    console.log(isAllPrimes.toString());
    response.send(isAllPrimes.toString());
});

app.get('/api/numbers/prime', (request, response) => {
    for(let num = 1; numOfPrimes <= request.query.amount; num++)
        {
            if(isRishoni(num, num - 1))
            {
                numbersToReturn.push(num);
                numOfPrimes++;
            }
        }
    console.log(numbersToReturn.join());
    response.send(numbersToReturn.join());
});

app.get('api/numbers/prime/display', (request, response) => {

    console.log("hi")
    
    /*generateTenPrimes(arrayOfTenPrimes); 

    response.render('index', { div1: arrayOfTenPrimes[0], div2: arrayOfTenPrimes[1], div3: arrayOfTenPrimes[2],
        div4: arrayOfTenPrimes[3], div5: arrayOfTenPrimes[4], div6: arrayOfTenPrimes[5],
        div7: arrayOfTenPrimes[6], div8: arrayOfTenPrimes[7], div9: arrayOfTenPrimes[8],
        div10: arrayOfTenPrimes[9] });
    generateTenPrimes(arrayOfTenPrimes);*/
})

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
});

function isRishoni(num, numMinusOne) {

    if(numMinusOne == 0 || numMinusOne == 1)
        return true;

    if(num % numMinusOne == 0)
        return false;
        
    return isRishoni(num, numMinusOne - 1);
}

function generateTenPrimes(arrayOfPrimes) {
    let numOfPrimesToTen = 0;
    let num = 1;

    while(numOfPrimesToTen > 10) {
        if(isRishoni(num))
        { 
            arrayOfTenPrimes.push(num);
            numOfPrimesToTen++;
        }
        num++;
    }
}