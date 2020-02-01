var mongoose = require("mongoose");
var schema = mongoose.Schema;

var tblRegisteration = new schema({
    Name : {
        type : String, 
        required : true,
        trim : true
    }, 

    Email : {
        type : String,
        required : true, 
        trim : true
    },

    Contact : {
        type : String,
        required : true,
        trim : true
    }, 
    Username : {
        type : String, 
        required : true,
        unique : true,
        trim : true
    },

    Password : {
        type : String, 
        required : true,
        trim : true
    }, 
    Role : {
        type : String,
        required : true,
         trim : true
    }

},{
    collection : "tblRegistration",
    timestamps : true
});

module.exports = mongoose.model("tblRegistration", tblRegisteration);