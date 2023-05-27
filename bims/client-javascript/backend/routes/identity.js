/* eslint-disable quotes */
/* eslint-disable strict */

const express = require("express");
const router = express.Router();
const getIdentity = require("../controllers/identities/getIdentity");
const createIdentity = require("../controllers/identities/createIdentity");
const getCTX = require("../controllers/identities/getCTX");

router.post("/", async (req, res) => {
    try {
        const { id, name } = req.body;
        const transactionId = await createIdentity(id, name);

        res.json({
            message: "Identity created successfully",
            transactionId,
        });
    } catch (error) {
        res.status(500).json({ error: error.responses[0].response.message });
    }
});

router.get("/ctx", async (req, res) => {
    try {
        const ctx = await getCTX();

        res.json(ctx);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const identity = await getIdentity(id);

        res.json(identity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
