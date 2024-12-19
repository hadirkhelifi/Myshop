const Wishlist = require("./../db/wishlist");

async function addToWishlist(userId, productId){
    const wishlist = new Wishlist({
        userId: userId,
        productId: prouductId,
    });
    await wishlist.save();
    return wishlist.toObject();
}
async function removeFromWishlist(userId, productId){
    await Wishlist.deleteMany({
        userId: userId,
        productId: productId,
    });
}
async function getWishlist(userId){
    let wishLists= await Wishlist.find({userId:userId}).populate('productId');
    return wishLists.map((x) => x.toObject().productId);  //
}
module.exports = { getWishlist, removeFromWishlist, addToWishlist }