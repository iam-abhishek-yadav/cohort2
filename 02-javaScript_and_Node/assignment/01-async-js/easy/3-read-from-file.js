const fs = require('fs');

const fileName = 'a.txt';

const readFile = (fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if(err){
            console.log("Error");
        } else {
            console.log(data);
        }
    })
}
readFile(fileName);

console.log("This prints first");

let sum = 0;

for(let i=0;i<10000000000;i++){
    sum += i;
}

console.log(sum);