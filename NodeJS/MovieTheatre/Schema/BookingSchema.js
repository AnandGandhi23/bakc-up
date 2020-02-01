var mongoose = require("mongoose");
var schema = mongoose.Schema;

var tblBooking = new schema({
    CustID : {
        type : String,
        required : true
    },

    TheatreID : {
        type : String,
        required : true
    },

    MovieID : {
        type : String,
        required : true
    },
    
    Seats : [Number],

    Amount : Number, 

    Status : {
        type : String, 
        enum : ['Pending', 'Completed'],
        default : 'Pending'
    }

}, {
    collection : "tblBooking",
    timestamps : true
});

module.exports = mongoose.model("tblBooking", tblBooking);