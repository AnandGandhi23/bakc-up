const fs = require("fs");

fs.readFile("../testing.txt","utf-8", (err, data) =>{
    if(err)
        throw err;

    console.log(data);
});

fs.writeFile("../testing.txt","Bla Bla", (err)=>{
    if(err)
        throw err;

    console.log("Data is overwritter");
});

fs.appendFile("../testing.txt"," this is appended text", (err)=>{
    if(err)
        throw err;
        
});