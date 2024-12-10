const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../handlers/category-handler"); // Ajout de getCategories

// Route POST pour ajouter une catégorie
router.post("", async (req, res) => {
    console.log("here");
    let model = req.body;
    let result = await addCategory(model);
    res.send(result);
});

// Route GET pour récupérer les catégories
router.get("", async (req, res) => {
    let result = await getCategories(); // Utilisation de la fonction correctement importée
    res.send(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let result = await getCategoryById(id); // Utilisation de la fonction correctement importée
    res.send(result);
});

// Route PUT pour mettre à jour une catégorie
router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params["id"];
    await updateCategory(id, model);
    res.send({ message: "updated" });
});

// Route DELETE pour supprimer une catégorie
router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    await deleteCategory(id); // La fonction deleteCategory est maintenant importée et utilisée
    res.send({ message: "deleted" });
});

module.exports = router;
  