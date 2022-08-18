import { config } from './config.js';
import express from 'express';
import dotenv from "dotenv"
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT) || config.SERVER_PORT;
let isAllPrimes = true;
let numOfPrimes = 0;
let numbersToReturn = [];

app.set('view engine', 'pug');
app.use(express.json());
app.use(bodyParser.json())

app.post('/api/numbers/prime/validate', (request, response) => {
    
    isAllPrimes = true;

    let array = request.body;
    array.forEach((element) => {
        if(!isRishoni(element, element - 1))
            isAllPrimes = false;
    }, this);

    console.log(isAllPrimes.toString());
    response.write(isAllPrimes.toString());

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

app.get('/api/numbers/prime/display', (request, response) => {
    
    console.log("hi");
    
    let arrayOfTenPrimes = generateTenPrimes(); 
    
    response.render('index', { title: "numbers", numbers: arrayOfTenPrimes});
    console.log(arrayOfTenPrimes);
});
    
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

function generateTenPrimes() {

    let numOfPrimesToTen = 0;
    let num = 1;
    let arrayOfTenPrimes = [];

    while(numOfPrimesToTen < 10) {

        if(isRishoni(num, num-1))
        { 
            arrayOfTenPrimes.push(num);
            numOfPrimesToTen++;
        }
        num++;
    }

    return arrayOfTenPrimes;
}