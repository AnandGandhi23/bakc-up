const express = require("express");
var route = express.Router();
route.use(express.json());

var tblRegistration = require("../Schema/RegisterUser");

route.post("/insert", (request,response)=>{
    var user = new tblRegistration(request.body);
    user.save().then((err,data)=>
    {
        if(err)
            response.send(err);
        else
            response.send(data);
    });
});

route.get("/", (request, response)=>{
    tblRegistration.find({},(err, data)=>{
        if(err)
            response.send(err);
        else
            response.send(data);
    });
});

module.exports = route;