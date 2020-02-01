const mongoose = require("mongoose");
const schema = mongoose.Schema;

var Transaction = new schema({
    "CustomerId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "AgentCustomer"
    },

    "CurrentBalance": {
        type: Number,
        default: 0
    },
    "Debit": {
        type: Array,
        default: []
    },

    "Credit": {
        type: Array,
        default: []
    },

},
    {
        collection: "Transaction",
        timestamps: true
    });

module.exports = mongoose.model("Transaction", Transaction);