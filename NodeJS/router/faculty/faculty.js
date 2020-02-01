const express = require("express");
var app = express();

var route = express.Router();
route.use(express.json());
var arrFaculty = [{
    "id": 1,
    "name": "anand",
    "subject": "ss",
}, {
    "id": 2,
    "name": "ami",
    "subject": "computer",
}];
var id = 3;
route.get("/", (request, response) => {
    var QueryString = request.query;

    var arrData = arrFaculty;
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
    arrFaculty.push(obj);

    response.json(obj);
});

route.delete("/delete/:id", (request, response) => {

    var deleteid = request.params.id;

    var index = arrFaculty.findIndex(data => data.id == deleteid);
    if (index > -1) {
        arrFaculty.splice(index, 1);
        response.redirect("/faculty");
    }
    else 
        response.json("No record found");
});

module.exports = route;