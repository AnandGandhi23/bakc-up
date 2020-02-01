const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Temp = new schema({
    "Name" : {
        type : String,
        unique : [true, "Name must be unique"]
    },
    "Div" : {
        type:String
        
    },

    "Marks" : {
        type : Number,
        min : [0, "marks can not be negative"],
        max : [100, "marks can not be greater than 100"]
    },
    "Product" : {
        type : Array,
        default : []
    }
}, {
    collection : "Temp"
});

module.exports = mongoose.model("Temp", Temp);