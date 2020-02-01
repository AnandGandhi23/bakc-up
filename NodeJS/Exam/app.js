const express = require("express");
var app = express();
const AdminManagerRoute = require("./Route/AdminManagerRoute");
const ManagerRoute = require("./Route/ManagerRoute");
const AgentRoute = require("./Route/AgentRoute");
const TransactionRoute = require("./Route/TransactionRoute");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dbExam", {useNewUrlParser : true, useUnifiedTopology:true, useCreateIndex:true});

mongoose.connection.on("error", (err)=>{
    console.log(err);
}).once("open", ()=>console.log("connection established"));


app.use("/user", AdminManagerRoute);
app.use("/manager", ManagerRoute);
app.use("/agent", AgentRoute);
app.use("/customer", TransactionRoute);

app.listen(3000, (err)=>console.log("server started"));