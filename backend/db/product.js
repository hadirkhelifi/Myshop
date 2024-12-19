const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, required: true }, // Correction : nom en minuscule pour cohérence
    discount: { type: Number },
    images: [{ type: String }], // Correction : tableau de chaînes
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
    brandId: { type: Schema.Types.ObjectId, ref: 'brands' } ,
    isFeatured:Boolean,
    isNewProduct:Boolean,
   
});
const Product = mongoose.model("products", productSchema);
module.exports = Product;   
