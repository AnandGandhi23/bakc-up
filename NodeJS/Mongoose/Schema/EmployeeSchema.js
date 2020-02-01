var mongoose = require("mongoose");
var schema = mongoose.Schema;

var tblEmployee = new schema({
    Name : {
        type: String,
        required: true,
        trim : true
    }, 

    Email : {
        type : String,
        required : true,
        trim : true
    },
    Gender : {
        type : String,
        required : true,
        trim : true,
        enum: ["Male", "Female"]
    },
    Usernane : {
        type : String,
        required : true,
        //unique : [true, "Username already exist"],
        trim : true
    },
    Password : {
        type : String,
        required : true,
        trim : true
    },
    Department : {
        type : String,
        required : true,
        trim : true
    },

    ProfilePic : {
        type:String,
        trim: true
    }

}, {
    collection : "tblEmployee",
    timestamps : true
});

module.exports = mongoose.model("tblEmployee", tblEmployee);