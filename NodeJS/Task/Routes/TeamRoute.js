const express = require("express");
const route = express.Router();
route.use(express.json());
const Team = require("../Schema/TeamSchema");
const Player = require("../Schema/PlayerSchema");
const jwt = require("../Helper/helper");
var key = "MY_KEY";
var tokenData = {};

route.post("/create" ,async (request, response,next)=>{
    var token = request.headers.auth;
    if(!token)
        return response.json("You have to login first");
    
    tokenData =  await jwt.verify(token, key);
    if( tokenData.Role == "Admin" || tokenData.Role == "Team")
        next();
    else
        return response.status(403).json("You dont have access");
},(request, response)=>{
    var objTeam = request.body;
    objTeam.CreatedBy =  tokenData._id;
    Team.insertMany(objTeam, (err,data)=>{
        if(err)
            response.json(err);
        else
            response.json(data);
    });
});

route.delete("/delete/:team",async (request, response, next)=>{

    var token = request.headers.auth;
    tokenData = await jwt.verify(token, key);

    if(tokenData.Role == "Admin")
        next();
    else if(tokenData.Role == "Team")
    {
        if(tokenData._id == request.params.team)
            next()
        else
            return response.status(403).json("You dont have access to delete");
    }
    else
        return response.status(403).json("You dont have access to delete");

} ,(request,response)=>{
    Team.findByIdAndDelete(request.params.team, (err,data)=>{
        if(err)
            response.json(err)
        else
        {
            Player.remove({"TeamId" : request.params.team}, (err,data)=>{
                if(err)
                    response.json(err)
                else
                    response.json(data);
            })
        }
    })
})

route.get("/list", (request, response)=>{
    Team.find({}, (err,data)=>{
        if(err)
            response.json(err);
        else
            response.json(data);
    })
})

route.get("/:TeamId", (request, response)=>{
    Team.findById(request.params.TeamId, (err,data)=>{
        if(err)
            response.json(err);
        else
            response.json(data);
    })
})

route.put("/update/:teamId", (request, response)=>{
    Team.findByIdAndUpdate(request.params.TeamId, request.body, (err,data)=>{
        if(err)
            response.json(err);
        else
            response.json(data);
    });
});

module.exports = route;
