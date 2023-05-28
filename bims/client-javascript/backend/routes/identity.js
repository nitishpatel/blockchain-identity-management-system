/* eslint-disable quotes */
/* eslint-disable strict */

const express = require("express");
const router = express.Router();
const getIdentity = require("../controllers/identities/getIdentity");
const createIdentity = require("../controllers/identities/createIdentity");
const getCTX = require("../controllers/identities/getCTX");
const addEducationProof = require("../controllers/identities/addEducationProof");
const { check } = require("express-validator");
const getIdentityUpdates = require("../controllers/identities/getIdentityUpdates");

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

router.post(
    "/education",
    [
        check("id", "id should be 12 characters long").isLength({ min: 12 }),
        check("proof", "proof should be 12 characters long").isObject(),
    ],
    async (req, res) => {
        try {
            const { id, proof } = req.body;
            const transactionId = await addEducationProof(id, proof);

            res.json({
                message: "Education proof added successfully",
                transactionId,
            });
        } catch (error) {
            res.status(500).json({
                error: error.responses[0].response.message,
            });
        }
    }
);

router.get("/updates/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = await getIdentityUpdates(id);

        res.json(updates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
