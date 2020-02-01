const express = require("express");
var route = express.Router();
route.use(express.json());
const cors = require("cors");
route.use(cors());
var tblEmployee = require("../Schema/EmployeeSchema");
var jwt = require("jsonwebtoken");

route.post("/insert", (request, response, next) => {
    var RegExpName = /^[a-zA-Z\s]+$/;
    if (!RegExpName.test(request.body.Name))
        return response.json({ "status": "error", "message": "Not a valid name" });

    var RegExpEmail = /^([a-zA-Z0-9\.\_])+\@(([a-zA-Z\-])+\.)+([a-zA-Z{2,4}])+$/;
    if (!RegExpEmail.test(request.body.Email))
        return response.json({ "status": "error", "message": "Not a valid email" });

    if (!RegExpName.test(request.body.Department))
        return response.json({ "status": "error", "message": "Not a valid department" });

    next();
}, (request, response) => {
    var tblEmp = new tblEmployee(request.body);
    tblEmp.save().then((data) => {
        response.json({ "status": "success" });
    }).catch((err) => {
        response.json({ "status": "error", "message": err.errmsg });
    });
});

route.patch("/update/:id", (request, response, next) => {
    var RegExpName = /^[a-zA-Z\s]+$/;
    if (!RegExpName.test(request.body.Name))
        return response.json("Not a valid name");

    var RegExpEmail = /^([a-zA-Z0-9\.\_])+\@(([a-zA-Z\-])+\.)+([a-zA-Z{2,4}])+$/;
    if (!RegExpEmail.test(request.body.Email))
        return response.json("Not a valid email");

    // var RegExpContact = /^[7-9]{1}[0-9]{9}/;
    // if (!RegExpContact.test(request.body.Contact))
    //     return response.json("Not a valid contact number");

    if (!RegExpName.test(request.body.Department))
        return response.json("Not a valid department");

    // var RegExpUsername = /^[a-zA-Z]{4,8}/;
    // if(!RegExpUsername.test(request.body.Username))
    //     return response.json("Not a valid username");

    next();
}, (request, response) => {
    tblEmployee.findByIdAndUpdate(request.params.id, request.body, (err, data) => {
        if (err)
            response.json(err.message)
        else
            response.json(data);
    })
});

route.get("/", (request, response) => {
    tblEmployee.find((err, data) => {
        if (err)
            response.json(err.message)
        else
            response.json(data);
    });

});

route.delete("/delete/:id", (request, response) => {
    tblEmployee.findByIdAndDelete(request.params.id, (err, data) => {
        if (err)
            response.json({ "status": "error", "message": err.errmsg });
        else
            response.send({ "status": "success" });
    });
});

route.post("/login", (request, response) => {
    jwt.sign(request.body, 'secretkey', (err, token) => {
        response.json(token);
    })
})

// function verifyToken(request, response, next) {
//     const bearerHeader = request.headers['authorization'];
//     if (typeof bearerHeader !== "undefined") {
//         request.token = bearerHeader;
//         next();
//     }
//     else {
//         console.log("undefined");
//         response.sendStatus(403);
//     }
// }

module.exports = route;
