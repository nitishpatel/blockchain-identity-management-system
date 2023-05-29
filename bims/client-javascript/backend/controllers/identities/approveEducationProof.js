/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");
const Approvals = require("../../models/approval");

async function approveEducationProof(id, proofId) {
    try {
        const { contract } = await connectToNetwork();
        const result = await contract.submitTransaction(
            "approveEducationProof",
            id,
            proofId
        );

        const approval = Approvals.updateOne(
            {
                proofId,
            },
            {
                deleted: true,
                verified: true,
            }
        );

        await approval.save();

        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = approveEducationProof;
