const fs = require('fs');

const fileName = 'a.txt';

const writeFile = (fileName) => {
    fs.writeFile(fileName, "Hey", 'utf8', (err) => {
        if(err) {
            console.log("Error");
        } else {
            console.log("Data written");
        }
    });
}

writeFile(fileName);

console.log("This prints first");

let sum = 0;

for(let i=0;i<10000000000;i++){
    sum += i;
}

console.log(sum);