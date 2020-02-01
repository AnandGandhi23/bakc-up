const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Users = new schema({
    "Username" : {
        type :String, 
        required : true,
        trim : true
    },

    "Password" : {
        type : String, 
        required : true,
        trim : true
    },
    "Role" : {
        type :String,
        required : true,
        enum : ["Player", "Team", "Admin"]
    }
},{
    collection : "Users",
    timestamps : true
});

module.exports = mongoose.model("Users", Users);