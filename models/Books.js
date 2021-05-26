const mongoose = require("mongoose");

const Books = mongoose.model("Books", {
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
});

module.exports = Books;
