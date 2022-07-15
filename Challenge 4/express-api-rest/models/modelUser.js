const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
});

module.exports = mongoose.model("User", dataSchema);