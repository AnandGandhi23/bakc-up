const mongoose = require("mongoose");
const schemma = mongoose.Schema;

var Player = new schemma({
    "Name": String,

    "Skill": {
        type: String,
        enum: ["Batsman", "Bowler", "Allrounder"]
    },

    "TeamId": { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team" 
    },
    "CreatedBy" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }
}, {
    collection: "Player",
    timestamps: true
});

module.exports = mongoose.model("Player", Player);