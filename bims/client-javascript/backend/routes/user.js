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
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
// router.get("/user/all", getUsers);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/getuser/:userId", isSignedIn, isAuthenticated, getCurrUser);
router.get("/colleges", isSignedIn, getColleges);
router.get("/companies", isSignedIn, getCompanies);
router.get("/approvals/:userId", isSignedIn, isAuthenticated, fetchApprovals);

module.exports = router;
