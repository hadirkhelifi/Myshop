const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: String,
});
const Category = mongoose.model("categor",categorySchema);
module.exports = Category;