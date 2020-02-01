const express = require("express");
const route = express.Router();
route.use(express.json());
var User = require("../Schema/UserSchema");
var jwt = require("../Hepler/helper");
var key = "MY_KEY";

async function verifyToken(token) {
    return await jwt.verify(token, key);
}
route.post("/register", (request, response) => {
    User.insertMany(request.body, (err, data) => {
        if (err)
            response.json(err);
        else
            response.json(data);
    });
});

route.get("/", async(request,response,next)=>{
    var token = request.headers.auth;
    var data = verifyToken(token);

    if(data.Role == "Admin")
        next()
    else
        return response.status(403).json({"forbidden" : "You dont have permission to access"});
},(request, response) => {
    User.find({}, (err, data) => {
        if (err)
            response.json(err);
        else
            response.json(data);
    });
});

route.get("/findbyid/:id", async(request,response,next)=>{
    var token = request.headers.auth;
    var data = verifyToken(token);
    if(data.Role == "Admin")
        next()
    else if(request.params.id == data.UserID)
        next();
    else
        return response.status(403).json({"forbidden" : "You dont have permission to access"});
},(request, response)=>{
    User.findById(request.params.id, (err,data)=>{
        if(err)
            response.json(err);
        else
            response.json(data);
    });
});

route.get("/login", (request, response) => {
    User.find({ "Username": request.body.Username, "Password": request.body.Password }, (err,data) => {
        if (err)
            response.json(err)
        else {
            console.log(data);
            if (data.length > 0) {

                response.json(jwt.sign({
                    "UserID": data[0]._id,
                    "Name": data[0].Name,
                    "Role" : data[0].Role
                },key));

                // response.json({"status" : 200,
                //     "message" : "Welcome"});
            }
            else
                response.status(400).json("invalid username or password");
        }
    });
});

route.patch("/write/:id",async(request,response,next)=>{

    if(request.body.Role)
        return response.status(400).json("you cant change role");

    var token = request.headers.auth;
    var data = await jwt.verify(token, key);

    if(data.Role == "Admin")
        next()
    else if(data.Role == "Read")
        return response.status(403).json({"forbidden" : "You dont have permission to access"});
    else if(data.Role == "Write" && request.params.id == data.UserID)
        next();
    else
        response.status(400).json("you can only change your data")
}, (request,response)=>{
    User.findByIdAndUpdate(request.params.id, request.body, (err, data)=>{
        if(err)
            response.json(err)
        else
            response.json(data);
    });
});

module.exports = route;