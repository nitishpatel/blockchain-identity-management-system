/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable strict */
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const identityRoutes = require("./backend/routes/identity");
const userRoutes = require("./backend/routes/user");
const authRoutes = require("./backend/routes/auth");

const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const all_routes = require("express-list-endpoints");
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED");
    });
app.use(express.json());
app.use(cors());

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Routes
app.use("/identities", identityRoutes);
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.get("/docs", (req, res) => {
    res.json({
        message: "Welcome to BIMS API",
        routes: all_routes(app),
    });
});
// Update Identity
// app.put("/identities/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         const contract = await connectToNetwork();
//         const result = await contract.submitTransaction(
//             "updateIdentity",
//             id,
//             JSON.stringify(data)
//         );

//         res.json({
//             message: "Identity updated successfully",
//             transactionId: result.toString(),
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
