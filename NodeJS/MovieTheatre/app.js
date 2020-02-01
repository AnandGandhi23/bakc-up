const express = require("express");
var app = express();
var RegisterRoute = require("./Route/RegistrationRoute");
var LoginRoute = require("./Route/LoginRoute");
var TheatreRoute = require("./Route/TheatreRoute");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true)

mongoose.connect("mongodb://localhost:27017/dbBookMyShow",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("error", (error)=>{
    console.log(error);
    process.exit(1);
}).once("open",()=>console.log("connection established"));

app.use("/registration", RegisterRoute);
app.use("/login", LoginRoute);
app.use("/theatre", TheatreRoute);
app.listen(3000, ()=>console.log("server started"));