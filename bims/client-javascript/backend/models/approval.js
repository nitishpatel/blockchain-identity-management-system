/* eslint-disable no-unused-vars */
/* eslint-disable strict */
let mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

let approvalSchema = new mongoose.Schema(
    {
        approver: mongoose.Schema.Types.String,
        proofId: mongoose.Schema.Types.String,
        proofType: mongoose.Schema.Types.String,
        deleted: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        dump: mongoose.Schema.Types.Mixed,
        candidateId: mongoose.Schema.Types.String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Approvals", approvalSchema);
