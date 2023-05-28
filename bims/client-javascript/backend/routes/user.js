const express = require("express");
const router = express.Router();
const {
    getUserById,
    getUser,
    updateUser,
    getCurrUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
// router.get("/user/all", getUsers);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/getuser/:userId", isSignedIn, isAuthenticated, getCurrUser);

module.exports = router;
