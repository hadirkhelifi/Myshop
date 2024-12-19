const Commande = require("./../db/Commande");
const mongoose = require("mongoose");

async function addCommande(model) {
    let commande = new Commande({
        name_user: model.name_user,
        name_produit: model.name_produit,
        date: model.date,
        qantite: model.qantite,
        mgs: model.mgs,
    });
    await commande.save();
    return commande.toObject();
}

async function getCommandes() {
    let commandes = await Commande.find();
    return commandes.map((c) => c.toObject());
}

async function getCommandeById(id) {
    // Vérification de la validité de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
    }

    let commande = await Commande.findById(id);
    return commande ? commande.toObject() : null; // Retourner null si la commande n'existe pas
}

async function updateCommande(id, model) {
    await Commande.findOneAndUpdate({ _id: id }, model);
    return;
}

async function deleteCommande(id) {
    await Commande.findByIdAndDelete(id);
    return;
}

module.exports = { addCommande, getCommandes, getCommandeById, updateCommande, deleteCommande };
