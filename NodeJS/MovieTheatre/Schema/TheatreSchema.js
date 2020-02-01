var mongoose = require("mongoose");
var schema = mongoose.Schema;

var movieSchema = new schema({
    Name : {
        type : String,
        required : true,
        trim : true
    },

    Seats : {
        type : Number,
    },

    BookedSeats : [Number],
    
    Price : {
        type : Number, 
        required : true
    }
})

var tblTheatre = new schema({
    Name : {
        type : String, 
        required : true,
        trim : true
    }, 

    Address : {
        type : String,
        required : true, 
        trim : true
    },

    Movie : movieSchema, 
    
},
{
    collection : "tblTheatre",
    timestamps : true
});

module.exports = mongoose.model("tblTheatre", tblTheatre);