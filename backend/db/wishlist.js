const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    productId : [{ type: Schema.Types.ObjectId, ref: 'products' }],
});
module.exports = mongoose.model('Wishlist', wishlistSchema);
