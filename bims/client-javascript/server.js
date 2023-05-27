/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable strict */
const express = require("express");
const connectToNetwork = require("./network");

const identityRoutes = require("./backend/routes/identity");
const app = express();
const port = 3000;

app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Routes
app.use("/identities", identityRoutes);

// // Create Identity
// app.post("/identities", async (req, res) => {
//     try {
//         const { id, name } = req.body;
//         const contract = await connectToNetwork();
//         const result = await contract.submitTransaction(
//             "createIdentity",
//             id,
//             name
//         );

//         res.json({
//             message: "Identity created successfully",
//             transactionId: result.toString(),
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Update Identity
app.put("/identities/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const contract = await connectToNetwork();
        const result = await contract.submitTransaction(
            "updateIdentity",
            id,
            JSON.stringify(data)
        );

        res.json({
            message: "Identity updated successfully",
            transactionId: result.toString(),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
