/* eslint-disable strict */
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    error: "No User was Found in DB",
                });
            }
            req.profile = user;
            next();
        })
        .catch((err) =>
            res.status(400).json({ error: "No User was Found in DB" })
        );
};

// exports.getUsers = (req, res, next) => {
//   User.find({}).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "Not applicable",
//       });
//     }
//     res.json(user);
//     next();
//   });
// };

exports.getUser = (req, res) => {
    // TODO: get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {
            _id: req.profile._id,
        },
        {
            $set: req.body,
        },
        { new: true, userFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: " You Are not authorized to update this uer",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};
