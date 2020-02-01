const mongoose = require("mongoose");
const schema = mongoose.Schema;

var AgentCustomer = new schema({
    "Username" : {
        type : String, 
        required : true,
        trim : true,
        unique : true
    }, 
    "Password" : {
        type : String, 
        required : true,
        trim : true
    },
    "Email" : {
        type : String, 
        required : true,
        trim : true
    },
    "Role" : {
        type : String, 
        enum : ["Agent", "Customer"],
        required : true,
        trim : true
    },
    "CreatedBy" : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "AdminManager",
        required : true,
        trim : true
    }
},{
    collection : "AgentCustomer",
    timestamps : true
})

module.exports = mongoose.model("AgentCustomer", AgentCustomer);