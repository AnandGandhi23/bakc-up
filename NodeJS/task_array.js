const express = require("express");

var app = express();
app.use(express.json());

var arrData = [{
    "id": 1,
    "firstname": "anand",
    "lastname": "gandhi"
},
{
    "id": 2,
    "firstname": "anisha",
    "lastname": "shah"
}];

app.use((req,res,next)=>
{
    console.log("middleware used.")
    next();
})

app.post("/Insert", (request, response) => {

    var objRecord = request.body;

    if (arrData.filter(e => e.id == objRecord.id).length > 0) {
        response.send("Record already exist");
    }
    else {
        arrData.push(objRecord);
        response.send(arrData);
    }
});

app.get("/", (request, response) => {
    response.send(arrData);
});

app.get("/GetDataByID", (request, response) => {
    var id = request.query.id;
    if(arrData.filter((data) => { return data.id == id }).length > 0)
        response.send(arrData.filter((data) => { return data.id == id }));
    else
        response.send("No record found");
    
});

app.put("/Update", (request, response) => {
    var id = request.query.id;

    var index = arrData.map(data => data.id).findIndex(data => data == id);
    if (index > -1) 
    {
        var objRecord = arrData[index];
        arrData.splice(index, 1);
        
        objRecord.firstname = request.query.firstname;
        objRecord.lastname = request.query.lastname;
        console.log(objRecord);
        arrData.push(objRecord);
        response.send(arrData);
    }
    else {
        response.send("No record found");
    }
});

app.delete("/Delete/:id", (request, response) => {

    var deleteid = request.params.id;

    var index = arrData.map(data => data.id).findIndex(data => data == deleteid);
    if (index > -1) {
        arrData.splice(index, 1);
        response.redirect("/");
    }
    else 
    {
        response.send("No record found");
    }
});

app.listen(3000);