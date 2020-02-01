const express = require("express");
var app = express();
const mongoose = require("mongoose");
const UserRoute = require("./Route/UserRoute");


mongoose.connect("mongodb://localhost:27017/Userdb",{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
mongoose.connection.on("error", (err)=>{
    console.log(err);
    process.exit(1);
}).once("open", ()=>console.log("connection established"));


app.use("/user", UserRoute);

app.listen(3000, (err)=>{
    if(err)
        console.log("server error");
    else
        console.log("server started");    
})