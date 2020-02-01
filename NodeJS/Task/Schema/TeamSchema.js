const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Team = new schema({
    "Name" : {
        type :String,
        required : true, 
        trim: true,
        unique : true
    }, 

    "Logo" : String,
    
    "TagLine" : String,

    "CreatedBy" : String 
    
},{
    collection : "Team",
    timestamps : true
}); 

module.exports = mongoose.model("Team", Team);