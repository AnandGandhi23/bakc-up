const express = require("express");
var route = express.Router();
const CookieParser = require("cookie-parser"); 
route.use(express.json());
route.use(CookieParser());
const jwt = require("../Helper/helper");
var tblUser = require("../Schema/RegisterUser");
var secretKey = "my_key";

route.get("/", (request, response)=>{
    var body = request.body;
    
    tblUser.find(body,(err,data)=>{
        if(err)
            response.send(err)
        else
        {    
            if(data.length <=0 )
                response.json("Invalid username or password");
            else
            {
                response.cookie("Name", data[0].Name);
                response.cookie("UserID", data[0]._id);
                var token = jwt.sign({"UserID": data[0]._id, "role":data[0].Role}, secretKey);
                console.log(token);
                response.send(data);
            }
        }
    });
});

module.exports = route;