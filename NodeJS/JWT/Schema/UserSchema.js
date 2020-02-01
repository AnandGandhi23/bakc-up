const mongoose = require("mongoose");
var schema = mongoose.Schema;

var User = new schema({
    "Name" : {
        type : String, 
        required : true, 
        trim : true
    },

    "Email" : {
        type : String, 
        required : true, 
        trim : true
    },

    "Contact" : {
        type : String, 
        required : true, 
        trim : true
    },

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

    "Role" : {
        type : String, 
        required : true, 
        enum : ["Admin", "Read", "Write"]
    }
},{
    collection : "User",
    timestamps : true
});

module.exports = mongoose.model("User", User);