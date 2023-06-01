const express = require("express");
const router = express.Router();
const {
    getUserById,
    getUser,
    updateUser,
    getCurrUser,
    getColleges,
    getCompanies,
    fetchApprovals,
    getOrganizations,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const getIdentityForOrganization = require("../controllers/identities/getIdentityByOrganization");

router.param("userId", getUserById);
// router.get("/user/all", getUsers);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/getuser/:userId", isSignedIn, isAuthenticated, getCurrUser);
router.get("/colleges", isSignedIn, getColleges);
router.get("/companies", isSignedIn, getCompanies);
router.get("/approvals/:userId", isSignedIn, isAuthenticated, fetchApprovals);
router.get("/organizations", isSignedIn, getOrganizations);
router.get(
    "/getuserdata/:id/:userId",
    isSignedIn,
    isAuthenticated,
    async (req, res) => {
        try {
            const data = await getIdentityForOrganization(
                req.params.id,
                req.params.userId
            );
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "No User was Found in DB" });
        }
    }
);

module.exports = router;
