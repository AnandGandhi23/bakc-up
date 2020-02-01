var express = require("express");
var cookie_parser = require("cookie-parser");

var app = express();
app.use(cookie_parser);

app.get("/", function(req, res)
{
    res.cookie("cookie1", "Anand").send("cookie has been set");
});

app.listen(3000, function(){
    console.log("server started");
});