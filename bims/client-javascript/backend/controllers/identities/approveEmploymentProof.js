/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");
const Approvals = require("../../models/approval");

async function approveEmploymentProof(id, proofId) {
    console.log("Approving education proof");
    console.log({ id, proofId });
    try {
        const { contract } = await connectToNetwork();
        const result = await contract.submitTransaction(
            "approveEmploymentProof",
            id,
            proofId
        );

        const approval = await Approvals.findOne({
            proofId,
        });

        approval.verified = true;
        approval.deleted = true;
        approval.save();

        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = approveEmploymentProof;
