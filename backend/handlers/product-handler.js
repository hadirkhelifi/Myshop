const Product = require("./../db/product"); // Assurez-vous que le chemin est correct.

async function addProduct(model) {
    let product = new Product({ // Utilisez 'Product' avec une majuscule
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function updatedProduct(id, model) {
    await Product.findByIdAndUpdate(id, model);
}

/*async function deleteProducts() {
    let products = await Product.find();
    return products.map((x) => x.toObject());
}*/

async function getProduct(id) {
    let product = await Product.findById(id);
    return product ? product.toObject() : null; // Ajout d'une vérification si le produit n'existe pas.
}
async function getAllProducts() {
    let products = await Product.find(); // Trouver tous les produits dans la base de données
    return products.map((product) => product.toObject()); // Convertir chaque produit en objet plain
}

async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true,
    });
   return newProducts.map((x)=> x.toObject());
}
async function getFeaturedProducts(){
    let FeaturedProducts = await  Product.find({
        isFeatured: true,
    });
   return FeaturedProducts.map((x)=> x.toObject());
}
async function deleteProducts(id) {
    await Product.findByIdAndDelete(id);   
}

module.exports = { addProduct, updatedProduct, deleteProducts, getProduct, getAllProducts, getFeaturedProducts, getNewProducts};