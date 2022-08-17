console.log(generateTenPrimes());

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