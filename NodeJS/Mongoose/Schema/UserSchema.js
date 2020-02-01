const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tblUser = new Schema({
    Name : {
        type : String,
        require : true,
        trim : true
    },

    Age : {
        type : Number,
        require : true,
        validate : {
            validator : function (v) {
                return /^[0-9]/.test(v)
            }
        }

    },

    DOB : {
        type : Date
    }
},{
    collection : tblUser,
    timestamps : true
});

module.exports = mongoose.model("tblUser", tblUser);