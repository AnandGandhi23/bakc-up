const mongoose = require("mongoose");
const schema = mongoose.Schema;

var admin_manager = new schema({
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
        enum : ["Admin", "Manager"],
        required : true,
        trim : true
    },
},{
    collection : "AdminManager",
    timestamps : true
})

module.exports = mongoose.model("adminmanager", admin_manager);