const express = require("express");
var app = express();
app.use(express.json());

var arrData = [{
    "id" : 1,
    "name" : "anand gandhi",
    "city" : "surat",
    "DOB" : "23-08-1997",
    "gender" : "male"   
},
{
    "id" : 2,
    "name" : "ami gandhi",
    "city" : "ahmedabad",
    "DOB" : "12-02-1992",
    "gender" : "female"   
}];

app.get("/", (request, response)=>{
    var qs = request.query;
    var arr = arrData;
    for (const item in qs) 
    {
        arr = arr.filter((data)=>{return data[item] == qs[item]});
        console.log(qs[item]);
    }

    if(arr.length <=0 )
        response.json("No record found");
    else    
        response.json(arr);
});

app.get("/GetDataByID", (request, response)=>{
    var id = request.query.id;
    response.json(arrData.filter(e => e.id == id));
});

app.post("/insert", (request, response, next) =>{
    var Only_Character = /^[\sa-zA-Z]+$/;

    if(!Only_Character.test(request.body.name))
        response.json("name should only contain characters");

    if(!Only_Character.test(request.body.city))
        response.json("city should only contain characters");

    var gender = request.body.gender;
    if(gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
        response.json("gender should be male or female");

    var CurrDate = new Date();
    var InsertedDate = new Date(request.body.DOB);
    if(InsertedDate > CurrDate)
        response.json("Birthdate can not be future date");

    if(CurrDate.getFullYear -  InsertedDate.getFullYear <18 || CurrDate.getFullYear -  InsertedDate.getFullYear > 100)
        response.json("Please select a proper date");

    next();
},(request, response)=>{
    var objRecord = request.body;

    if (arrData.filter(e => e.id == objRecord.id).length > 0) {
        response.send("Record already exist");
    }
    else {
        arrData.push(objRecord);
        response.json(arrData);
    }
});

app.put("/replace/:id",(request, response, next) => {
    var Only_Character = /^[\sa-zA-Z]+$/;

    if(!Only_Character.test(request.body.name))
        response.json("name should only contain characters");

    if(!Only_Character.test(request.body.city))
        response.json("city should only contain characters");

    var gender = request.body.gender;
    if(gender.toLowerCase() != "male" && gender.toLowerCase() != "female")
        response.json("gender should be male or female");

    var CurrDate = new Date();
    var InsertedDate = new Date(request.body.DOB);
    if(InsertedDate > CurrDate)
        response.json("Birthdate can not be future date");

    if(CurrDate.getFullYear -  InsertedDate.getFullYear <18 || CurrDate.getFullYear -  InsertedDate.getFullYear > 100)
        response.json("Please select a proper date");

    next();
} , (request, response)=>{
    var id = request.params.id;
    var objUser = request.body;

    var index = arrData.findIndex((data)=>{return data.id == id});
    if(index > -1)
    {
        if(id != objUser.id)
        {
            response.json("both id should be equal");
        }
        arrData.splice(index, 1);
        arrData.push(objUser);

        response.json(arrData);
    }
    else
        response.json("No record found");
});

app.patch("/update/:id", (request, response)=>{
    var id = request.params.id;
    var objUser = request.body;

    for (const item in objUser) 
    {
        arrData.filter(data => data.id == id).map(data => {
            let obj = data;
            obj[item] = objUser[item];
            return obj;
        });
    }

    response.json(arrData);
});

app.delete("/delete/:id", (request, response) => {

    var deleteid = request.params.id;

    var index = arrData.findIndex(data => data.id == deleteid);
    if (index > -1) {
        arrData.splice(index, 1);
        response.redirect("/");
    }
    else 
        response.json("No record found");
});

app.listen(3000);