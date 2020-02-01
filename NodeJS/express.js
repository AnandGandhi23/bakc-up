const express = require('express');
var app = express();








app.get('/', function (req, res) {
    var status = res.statusCode;
    res.send('Staus code is ' + status);
});



app.listen(3000, function (err) { 
    if(err)
    {
        throw err;
    }
    else{
        console.log("server started");
    }
});