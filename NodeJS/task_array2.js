const express = require("express");
const app = express();
const validator = require("validator");
const router = express.Router();
var jsonData = require("./data.json");
var arrData = [];
arrData = jsonData;
app.use(express.json());

router.use("/",(request, response, next)=> {
    console.log("middleware");

    if(request.method == "POST")
    {
        if(!validator.isEmail(request.body.email))
        {
            response.send("insert proper email");
        }
        console.log("post method");
    }
    next();
});

router.get("/", (request, response) => {
    response.send(jsonData);
});

router.post("/insert", (request, response) => {
    var objUser = request.body;
    jsonData.push(objUser);

    response.redirect("/task");
});

router.put("/update", (request, response)=>{
    var objUser = request.body;
    var id=objUser.id;


    if(arrData.filter((data)=>{return data.id == id}).length <= 0)
        response.send("no records found");
    else
    {
        var index = arrData.findIndex((data) => data.id == id);
        var objData = arrData[index];

        arrData.splice(index, 1);
        objData.name = request.body.name;
        objData.email = request.body.email;
        objData.birthdate = request.body.birthdate;

        arrData.push(objData);
        response.redirect("/task");
    }
});

router.delete("/delete/:id", (request, response)=>{
    var id = request.params.id;

    var index = arrData.findIndex((data) => data.id == id);
    arrData.splice(index,1);
    response.redirect("/task");
});

app.use("/task", router);

app.listen(3000);
