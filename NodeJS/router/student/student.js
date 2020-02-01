const express = require("express");
var app = express();

var route = express.Router();
route.use(express.json());
var arrStudent = [{
    "id": 1,
    "name": "anand",
    "address": "adajan",
    "sem": 8
}, {
    "id": 2,
    "name": "ami",
    "address": "vesu",
    "sem": 10
}];
var id = 3;

route.get("/", (request, response) => {
    var QueryString = request.query;

    var arrData = arrStudent;
    for (const item in QueryString) {
        arrData = arrData.filter(data => data[item] == QueryString[item]);
    }
    if (arrData.length > 0)
        response.json(arrData);
    else
        response.sendStatus(204);
});

route.post("/insert", (request, response) => {
    var obj = request.body;
    obj.id = id;
    id++;
    arrStudent.push(obj);

    response.json(obj);
});

route.patch("/update/:id", (request, response) => {
    var id = request.params.id;
    var obj = request.body;

    if (arrStudent.filter(data => data.id == id).length <= 0)
        response.sendStatus(204);
    else {
        for (const item in obj) {
            arrStudent.filter(data => data.id == id).map((data) => {
                var objData = data;
                objData[item] = obj[item];
                return objData;
            })
        }

        response.send(arrStudent);
    }
});

module.exports = route;
