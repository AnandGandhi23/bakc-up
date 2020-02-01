const express = require("express");
var route = require("./Route/UserRoute");
var emproute = require("./Route/EmployeeRoute");
var app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dbUser",{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.on("error", (error)=>
{
    console.log("connection failed");
    process.exit(1);
}).once("open",()=>{
    console.log("connection established");
});

app.use("/user", route);
app.use("/employee", emproute);


app.listen(3001, (error)=>
{
    if(error)
        console.log("error in server");
    else
        console.log("serser started");
});