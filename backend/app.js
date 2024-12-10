const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const ProductRoutes = require("./routes/product");
const customerRouters = require("./routes/customer");
const authRoutes= require("./routes/auth");
const { verifyToken,isAdmin } = require("./middleware/auth-middleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes principales
app.get("/", (req, res) => {
    res.send("Server running");
});
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken,isAdmin, brandRoutes);
app.use("/product", verifyToken,isAdmin, ProductRoutes);
app.use("/customer", verifyToken, customerRouters);
app.use("/auth",authRoutes);

// Fonction pour connecter à MongoDB
async function connectDb() {
    try {
        await mongoose.connect("mongodb://localhost:27017", {
            dbName: "e-comm-store-db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
}

// Connexion à MongoDB
connectDb();

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
