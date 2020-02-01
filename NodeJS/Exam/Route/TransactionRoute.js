const express = require("express");
const route = express.Router();
route.use(express.json());
const Transaction = require("../Schema/transaction");
const AgentCustomer = require("../Schema/agent_customer");
const jwt = require("../Helper/helper");
const key = "MY_KEY";
const mongodb = require("mongodb");
var tokenData = {};

route.put("/credit", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Customer")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    Transaction.find({ "CustomerId": tokenData._id }, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else {
            if (data.length <= 0) {
                let objTransaction = {};
                objTransaction.CustomerId = tokenData._id;
                objTransaction.Credit = request.body;
                objTransaction.CurrentBalance = request.body[0].Amount;
    
                Transaction.insertMany(objTransaction, (err, data) => {
                    if (err)
                        response.json({ "error": err.message });
                    else
                        response.json(data);
                });
            }
            else {
                
                console.log(data);
                Transaction.updateOne({"CustomerId" : mongodb.ObjectId( tokenData._id)}, {"CurrentBalance" : data[0].CurrentBalance + request.body[0].Amount, $push : {"Credit" : request.body}}, (err,data)=>{
                    if(err)
                        response.json(err)
                    else
                        response.json(data);
                })
            }
        }
    })
})

route.put("/update/:cid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Customer" || tokenData.Role == "Admin")
    {
        if(request.body.Username)
            return response.status(400).json("You cant change Username");
        if(request.body.CreatedBy)
            return response.status(400).json("You cant change created by");
        if(tokenData.Role != "Admin" && request.body.Role)
            return response.status(400).json("You cant change role");
        next();
    }
    else
        return response.status(403).json("Permission denied");

}, (request,response)=>{
    AgentCustomer.findByIdAndUpdate(request.params.cid, request.body ,(err, data)=>{
        if(err)
            response.json({"error" : err.message});
        else
            response.json(data);
    })
})

route.get("/:cid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Customer" || tokenData.Role == "Admin")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request,response)=>{
    AgentCustomer.findById(request.params.cid ,(err, data)=>{
        if(err)
            response.json({"error" : err.message});
        else
            response.json(data);
    })
})

route.get("/transaction/:cid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Customer" || tokenData.Role == "Admin")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request,response)=>{
    Transaction.find({"CustomerId" : mongodb.ObjectId(request.params.cid)} ,(err, data)=>{
        if(err)
            response.json({"error" : err.message});
        else
            response.json(data);
    })
})

route.put("/debit", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Customer")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    Transaction.find({ "CustomerId": tokenData._id }, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else {
            if (data.length <= 0) {
                response.status(400).json("Your balance is zero");
            }
            else {
                console.log(data);
                Transaction.updateOne({"CustomerId" : mongodb.ObjectId( tokenData._id), "CurrentBalance":{$gt : request.body[0].Amount}}, {"CurrentBalance" : data[0].CurrentBalance - request.body[0].Amount, $push : {"Debit" : request.body}}, (err,data)=>{
                    if(err)
                        response.json(err)
                    else
                        response.json(data);
                })
            }
        }
    })
})

module.exports = route;