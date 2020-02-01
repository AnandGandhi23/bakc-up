const express = require("express");
const route = express.Router();
route.use(express.json());
const AgentCustomer = require("../Schema/agent_customer");
const jwt = require("../Helper/helper");
const key = "MY_KEY";
var tokenData = {};

route.post("/createagent", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    var RegExpEmail = /^([a-zA-Z0-9\.\_])+\@(([a-zA-Z\-])+\.)+([a-zA-Z{2,4}])+$/;
    if (!RegExpEmail.test(request.body.Email))
        return response.json("Not a valid email");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Admin" || tokenData.Role == "Manager")
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

route.get("/listagent", async (request, response, next) => {
    // let token = request.headers.auth;
    // if (!token)
    //     return response.status(404).json("token not found");

    // tokenData = await jwt.verify(token, key);
    // if (tokenData.Role == "Admin" || tokenData.Role == "Manager")
    //     next();
    // else
    //     return response.status(403).json("Permission denied");

    next();

}, (request, response) => {
    AgentCustomer.find({"Role" : "Agent"}, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else
            response.json(data);
    })
})

route.get("/:agentid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Admin" || tokenData.Role == "Manager")
        next();
    else
        return response.status(403).json("Permission denied");

}, (request, response) => {
    AgentCustomer.findById(request.params.agentid, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else
            response.json(data);
    });
});

route.put("/:agentid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Manager" || tokenData.Role == "Admin") {
        AgentCustomer.findById(request.params.agentid, (err, data) => {
            if (err)
                return response.json({ "error": err.message });
            else {
                if(!data)
                    return response.status(204).json("No data found");

                if(data.Role != "Agent")
                    return response.status(400).json("You can't change other role data than agent");

                if (tokenData.Role == "Admin" || data.CreatedBy == tokenData._id)
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
    
    if(request.body.Role)
        return response.status(400).json("You cant change 'Role'");
    
    AgentCustomer.findByIdAndUpdate(request.params.agentid, request.body, (err, data) => {
        if (err)
            response.json({ "error": err.message });
        else
            response.json(data);
    });
});

route.delete("/:agentid", async (request, response, next) => {
    let token = request.headers.auth;
    if (!token)
        return response.status(404).json("token not found");

    tokenData = await jwt.verify(token, key);
    if (tokenData.Role == "Manager" || tokenData.Role == "Admin") {
        AgentCustomer.findById(request.params.agentid, (err, data) => {
            if (err)
                return response.json({ "error": err.message });
            else {
                if(!data)
                    return response.status(204).json("No data found");

                if(data.Role != "Agent")
                    return response.status(400).json("You can't delete other role data than agent");

                if (tokenData.Role == "Admin" || data.CreatedBy == tokenData._id)
                    next();
                else
                    return response.status(403).json("Permission denied");
            }
        })
    }
    else
        return response.status(403).json("Permission denied");

}, (request,response)=>{
    AgentCustomer.findByIdAndDelete(request.params.agentid , (err,data)=>{
        if(err)
            response.json({"error" : err.message});
        else
        {
            AgentCustomer.remove({"CreatedBy" :request.params.agentid}, (err,data)=>{
                if(err)
                    response.json({"error" : err.message});
                else
                    response.json(data);
            })
        }
    });
});
module.exports = route;