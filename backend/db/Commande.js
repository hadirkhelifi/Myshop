const mongoose = require("mongoose");
const CommandeSchema = new mongoose.Schema({
    name_user: String,
    name_produit: String,
    date: String,
    qantite: Number,
    mgs: String,

});
const Commande = mongoose.model("Commande",CommandeSchema);
module.exports = Commande;