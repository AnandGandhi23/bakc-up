const express = require("express");
const route = express.Router();
const Temp = require("../Schema/TempSchema");
route.use(express.json())

route.post("/insert", (request, response)=>{
    Temp.insertMany(request.body, (err,data)=>{
        if(err)
            response.json({"Error" : err.message});
        else
            response.json(data);
    })
}) 

route.patch("/update/:id", (request, response)=>{
    Temp.findByIdAndUpdate(request.params.id, {$push : {Product : request.body}}, (err,data)=>{
        if(err)
            response.json({"error" : err})
        else
            response.json(data);
    })
})

route.get("/", (request,response)=>{
    Temp.find({}, (err,data)=>{
        if(err)
            response.json({"Error" : err.message});
        else
            response.json(data);
    })
})

route.get("/databydiv", (request, response)=>{

    Temp.aggregate([
        {
            $group: {
                _id : "$Div",
                AverageMarks : {
                    $avg : "$Marks"
                } 
            }
        }
    ]).sort({AverageMarks : 1}).then((data)=>{
        response.json(data)
    }).catch((err)=>{
        response.json(err)
    })
})

route.get("/getPurchaseProducts/:id", (request, respopnse)=>{
    Temp.findById(request.params.id, {"Product" : 1, "_id":0}, (err, data)=>{
        if(err)
            respopnse.json(err)
        else
            respopnse.json(data);
    })
})

route.get("/gettotalquantity/:id", (request, response)=>{
    Temp.findById(request.params.id, {"Product" : 1, "_id":0}, (err, data)=>{
        if(err)
            respopnse.json(err)
        else
        {
            var arrProduct = [];
            arrProduct = data.Product;
            var totalQuantity = 0;
            arrProduct.map((data)=>{
                totalQuantity
            })
            respopnse.json(data);
        }
         
    })
})

module.exports = route;