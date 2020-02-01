const express = require("express");
const route = express.Router();
route.use(express.json());
const Player = require("../Schema/PlayerSchema");
const mongodb = require("mongodb");
var cookieParser = require("cookie-parser");
route.use(cookieParser());
var jwt = require("../Helper/helper");
var tokenData = {};
var key = "MY_KEY";

async function verifyToken(token)
{
    var token = request.cookies.Token;
    tokenData = await jwt.verify(token, key);
}

route.get("/byteam/:team", (request, response) => {
    var teamid = request.params.team;

    Player.find({ "TeamId": teamid }, (err, data) => {
        if (err)
            response.json(err)
        else
            response.json(data)
    })
});

route.post("/insert", async (request, response, next) => {
    
    verifyToken();
    if (tokenData.Role == "Admin" || tokenData.Role == "Player")
        next();
    else
        response.status(403).json("you dont have permission to create player");

}, (request, response) => {
    var objPlayer = request.body;
    objPlayer.CreatedBy = tokenData._id;
    Player.insertMany(objPlayer, (err, data) => {
        if (err)
            response.json(err)
        else
            response.jsonp(data)
    });
});

route.patch("/update/:playerId", async (request, response, next) => {
    var token = request.cookies.Token;
    tokenData = await jwt.verify(token, key);

    console.log(tokenData);
    if (tokenData.Role == "Admin")
        next();
    else if (tokenData.Role == "Player") {
        Player.findById(request.params.playerId, (err, data) => {
            console.log(data);
            if (tokenData._id == data.CreatedBy)
                next();
            else
                response.status(403).json("you dont have permission to update player");
        })

    }
    else
        response.status(403).json("you dont have permission to create player");
}, (request, response) => {
    Player.findByIdAndUpdate(request.params.playerId, request.body, (err, data) => {
        if (err)
            response.json(err)
        else
            response.json(data);
    })
})

route.get("/", (request, response) => {
    Player.aggregate([{
        "$lookup": {
            "from": "Team",
            "localField": "TeamId",
            "foreignField": "_id",
            "as": "TeamInfo"
        }
    }], (err, data) => {
        if (err)
            response.json(err);
        else
            response.json(data);
    })
});

route.get("/batsmanbowler/:team", (request, response) => {
    Player.aggregate(
        [
            {
                $match: { TeamId: mongodb.ObjectId(request.params.team) }
            },
            {
                $group:
                {
                    _id: "$Skill",
                    count: { $sum: 1 }
                }
            }
        ], (err, data) => {
            if (err)
                response.json(err);
            else
                response.json(data);
        })
});

route.delete("/delete/:playerId", async (request, response, next) => {
    var token = request.cookies.Token;
    tokenData = await jwt.verify(token, key);

    if (tokenData.Role == "Admin")
        next();
    else if (tokenData.Role == "Player") {
        Player.findById(request.params.playerId, (err, data) => {
            if (tokenData._id == data.CreatedBy)
                next();
            else
                response.status(403).json("you dont have permission to delete player");
        })

    }
    else
        response.status(403).json("you dont have permission to delete player");
}, (request, response) => {
    Player.findByIdAndDelete(request.params.playerId, (err, data) => {
        if (err)
            response.json(err)
        else
            response.json(data);
    })
})

module.exports = route;