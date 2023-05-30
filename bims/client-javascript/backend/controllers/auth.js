/* eslint-disable no-unused-vars */
/* eslint-disable strict */
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
let jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
const mongoose = require("mongoose");
const registerUser = require("../../registerUser");
const createIdentity = require("../controllers/identities/createIdentity");
const getIdentity = require("../controllers/identities/getIdentity");
exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const user = new User(req.body);

    user.save()
        .then((user) => {
            registerUser(user._id, user.role);
            createIdentity(user._id, user.name);
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Not able to save user in DB",
            });
        });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({ email })
        .then(async (user) => {
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email and password do not match",
                });
            }

            //create token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            //put token in cookie
            res.cookie("token", token, { expire: new Date() + 9999 });

            //send response to front end
            const { _id, name, email, role } = user;
            const identity = await getIdentity(_id);
            return res.json({
                token,
                user: { _id, name, email, role, identity },
            });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: "USER email does not exists",
                });
            }
        });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully",
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker =
        req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    console.log(req.profile);
    console.log(req.auth);
    console.log(req.profile._id);
    console.log(req.auth._id);
    console.log(checker);

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied",
        });
    }
    next();
};
