const express = require("express");
const route = express.Router();
route.use(express.json());
const AgentCustomer = require("../Schema/agent_customer");
const Transaction = require("../Schema/transaction");
const jwt = require("../Helper/helper");
const key = "MY_KEY";
var tokenData = {};

route.post("/createcustomer", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Admin" || tokenData.Role == "Agent")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    let objData = request.body;
    objData.CreatedBy = tokenData._id;
    AgentCustomer.insertMany(objData, (err, data) => {
        if (err)
            response.json({ "error": err });
        else
            response.json(data);
    });
});

route.get("/listcustomer", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Admin" || tokenData.Role == "Agent")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    // AgentCustomer.find({"Role" : "Customer"}, (err, data) => {
    //     if (err)
    //         response.json({ "error": err.message });
    //     else
    //         response.json(data);
    // });

    AgentCustomer.aggregate([{
        $lookup : {
            "from" : "Transaction",
            localField : "_id",
            foreignField : "CustomerId",
            as:"Transaction"
        }
    }]).then((data)=>{
        response.json(data);
    })

});

route.get("/:customerid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Admin" || tokenData.Role == "Agent")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    AgentCustomer.findById(request.params.customerid, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else
            response.json(data);
    });
});

route.put("/:customerid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Agent" || tokenData.Role == "Admin") {
        AgentCustomer.findById(request.params.customerid, (err, data) => {
            if (err)
                return response.json({ "error": err.message });
            else {
                if(!data)
                    return response.status(204).json("No data found");
                if(data.Role != "Customer")
                    return response.status(400).json("You can't change other role data than customer");
                
                if(tokenData.Role == "Admin" || data.CreatedBy == tokenData._id)
                    next();
                else
                    return response.status(403).json("Permission denied");
            }
        })
    }
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    if(request.body.CreatedBy)
         return response.status(400).json("You cant change 'CreatedBy'");
    
    if(request.body.Role )
        return response.status(400).json("You cant change 'Role'");
    
    AgentCustomer.findByIdAndUpdate(request.params.customerid, request.body, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else
            response.json(data);
    });
});

route.delete("/:customerid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Agent" || tokenData.Role == "Admin") {
        AgentCustomer.findById(request.params.customerid, (err, data) => {
            if (err)
                return response.json({ "error": err.message });
            else {
                if(data.Role != "Customer")
                    return response.status(400).json("You can't delete other role data than customer");
                
                if(tokenData.Role == "Admin" || data.CreatedBy == tokenData._id)
                    next();
                else
                    return response.status(403).json("Permission denied");
            }
        })
    }
    else
        return response.status(403).json("Permission denied");

}, (request,response)=>{
    AgentCustomer.findByIdAndDelete(request.params.customerid , (err,data)=>{
        if(err)
            response.json({"error" : err.message});
        else
        {
            Transaction.remove({"CustomerId" :request.params.customerid},(err,data)=>{
                if(err)
                    response.json({"error" : err.message});
                else
                response.json(data);
            })
        }
            
    });
});

route.post("/login", (request, response)=>{
    AgentCustomer.find(request.body, (err,data)=>{
        if(err)
            response.json({"error" : err});
        else
        {
            if(data.length > 0)
            {
                console.log(jwt.sign({"_id" : data[0]._id, "Role" : data[0].Role}, key)); 
                response.json("welcome " + data[0].Role);
            } 
            else
                response.status(400).json("Invalid username or password");
        }
    })
})


module.exports = route;