const express = require("express");
const route = express.Router();
route.use(express.json());
const AdminManager = require("../Schema/admin_manager");
const jwt = require("../Helper/helper");
const key = "MY_KEY";

route.post("/create", (request, response)=>{
    AdminManager.insertMany(request.body, (err,data)=>{
        if(err)
            response.json({"error" : err});
        else
            response.json(data);
    });
});

route.post("/login", (request, response)=>{
    AdminManager.find(request.body, (err,data)=>{
        if(err)
            response.json({"error" : err});
        else
        {
            if(data.length>0)
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