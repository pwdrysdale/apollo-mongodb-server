const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
    name: String,
});

module.exports = Users;
