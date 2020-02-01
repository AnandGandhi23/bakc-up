const express = require("express");
const route = express.Router();
route.use(express.json());
const User = require("../Schema/UserSchema");
const jwt = require("../Helper/helper");
var key = "MY_KEY";
var cookieParser = require("cookie-parser");
route.use(cookieParser());

route.get("/", (request, response) => {
    User.find({}, (err, data) => {
        if (err)
            response.json(err);
        else
            response.json(data);
    });
});

route.post("/register", (request, response) => {
    User.insertMany(request.body, (err, data) => {
        if (err)
            response.json(err)
        else
            response.json(data);
    });
});

route.post("/login", (request, response) => {
    User.find(request.body, (err, data) => {
        if (err)
            response.json(err);
        else {
            if (data.length > 0) {
                console.log(data[0]._id)
                var token = jwt.sign({
                    "_id": data[0]._id,
                    "Role" : data[0].Role
                }, key);

                console.log(token);
                response.cookie("Token", token);
                response.json(token);
            }
            else
                response.status(400).json("Invalid username or password");
        }
    });
});

module.exports = route;