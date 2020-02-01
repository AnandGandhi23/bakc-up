const express = require("express");
var route = express.Router();
route.use(express.json());

var tblUser = require("../Schema/UserSchema");

route.get("/", (request, response)=>
{
    var qs = request.query;
    var condition = {};
    
    for (const key in qs) {
        condition[key] = qs[key];    
    }
    
    console.log(condition);
    tblUser.find(condition,(error,data) =>
    {
        if(error)
            response.send(error)
        else
            response.send(data);
    })
})

route.delete("/delete/:id", (request, response)=>
{
    tblUser.findByIdAndDelete(request.params.id, (error, data)=>{
        if(error)
            response.send(400).status();
        else
            response.send(data);
    })
})

route.patch("/update/:id", (request, response)=>
{
    tblUser.findByIdAndUpdate(request.params.id, request.body, (error, data)=>{
        if(error)
            response.send(400).status();
        else
            response.send(data);
    })
})

route.post("/insert", (request, response)=>{
    var user = new tblUser(request.body);
    user.save().then((data)=>
    {
        response.send(data);
    }).catch((error)=>
    {
        response.send(error);
    })
});

module.exports = route;