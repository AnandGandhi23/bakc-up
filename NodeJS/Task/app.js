const express = require("express");
var app = express();
var UserRoute = require("./Routes/UserRoute");
var TeamRoute = require("./Routes/TeamRoute");
var PlayerRoute = require("./Routes/PlayerRoute");
var TempRoute = require("./Routes/TempRoute");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dbCricket", {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
mongoose.connection.on("error", (error)=>{
    console.log(error);
}).once("open", ()=>console.log("connection established"));


app.use("/user", UserRoute);
app.use("/team", TeamRoute);
app.use("/player", PlayerRoute);
app.use("/temp", TempRoute);
app.listen(3000, (error)=>console.log("server started"));
