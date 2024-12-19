const express = require("express");
const router = express.Router();
const { 
    addCommande, 
    getCommandes, 
    getCommandeById, 
    updateCommande, 
    deleteCommande 
} = require("../handlers/Commande-handler"); // Import des fonctions de gestion des commandes

// Route POST pour ajouter une commande
router.post("", async (req, res) => {
    try {
        let model = req.body;
        let result = await addCommande(model);
        res.send(result);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error);
        res.status(500).send({ error: "Erreur lors de l'ajout de la commande" });
    }
});

// Route GET pour récupérer toutes les commandes
router.get("", async (req, res) => {
    try {
        let result = await getCommandes();
        res.send(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).send({ error: "Erreur lors de la récupération des commandes" });
    }
});

// Route GET pour récupérer une commande par ID
router.get("/:id", async (req, res) => {
    try {
        let id = req.params["id"];
        let result = await getCommandeById(id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ error: "Commande introuvable" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
        res.status(500).send({ error: "Erreur lors de la récupération de la commande" });
    }
});

// Route PUT pour mettre à jour une commande
router.put("/:id", async (req, res) => {
    try {
        let id = req.params["id"];
        let model = req.body;
        await updateCommande(id, model);
        res.send({ message: "Commande mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        res.status(500).send({ error: "Erreur lors de la mise à jour de la commande" });
    }
});

// Route DELETE pour supprimer une commande
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params["id"];
        await deleteCommande(id);
        res.send({ message: "Commande supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande :", error);
        res.status(500).send({ error: "Erreur lors de la suppression de la commande" });
    }
});

module.exports = router;
