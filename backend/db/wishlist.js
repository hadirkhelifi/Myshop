const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    productsId: Array(String)
});
const WishList = mongoose.model("wishLists",categorySchema);
module.exports = WishList;