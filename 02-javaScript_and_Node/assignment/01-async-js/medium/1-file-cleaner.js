const fs = require('fs');

const fileName = 'a.txt';

const cleanFile = (fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if(err) {
            console.log("Error reading");
        } else {
            data = data.replace(/\s+/g , ' ');
            fs.writeFile(fileName, data, 'utf8', (err) => {
                if(err) {
                    console.log("Error writin");
                } else {
                    console.log("Data written");
                }
            })
        }
    })
}

cleanFile(fileName)