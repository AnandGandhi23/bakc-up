var express = require("express");
var app = express();
app.use(express.static('public'));
app.get("/home", (req, res)=>
{
    res.sendFile(__dirname + "/" + "index.html");
});

app.get("/process", function(req, res){
    response = {
        first_name : req.query.txtFirstName,
        last_name : req.query.txtLastName
    };

    console.log(res);
    console.log(req.query);
    res.end(JSON.stringify(response));
});

app.listen(3000);