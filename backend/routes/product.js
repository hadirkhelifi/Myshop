const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
    addProduct,
    updatedProduct,
    deleteProducts,
    getProduct,
    getAllProducts,
} = require("../handlers/product-handler");

// Ajouter un middleware de logging
router.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.originalUrl}`);
    next();
});

// Ajouter un produit
router.post("/", async (req, res) => {
    try {
        let model = req.body;
        let product = await addProduct(model);
        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to add product" });
    }
});

// Mettre à jour un produit
router.put("/:id", async (req, res) => {
    try {
        let model = req.body;
        let id = req.params["id"];

        // Vérification de l'ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }

        let updated = await updatedProduct(id, model);
        if (!updated) {
            return res.status(404).send({ error: "Product not found" });
        }

        res.send({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update product" });
    }
});

// Supprimer un produit
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params["id"];

        // Vérification de l'ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }

        let deleted = await deleteProducts(id);
        if (!deleted) {
            return res.status(404).send({ error: "Product not found" });
        }

        res.send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete product" });
    }
});

// Obtenir un produit par ID
router.get("/:id", async (req, res) => {
    try {
        let id = req.params["id"];

        // Vérification de l'ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }

        let product = await getProduct(id);
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to get product" });
    }
});

// Obtenir tous les produits
router.get("/", async (req, res) => {
    try {
        let products = await getAllProducts();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to get products" });
    }
});

module.exports = router;
