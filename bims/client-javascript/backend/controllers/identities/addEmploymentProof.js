/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");
const uuidv1 = require("uuid/v1");
const Approvals = require("../../models/approval");

async function addEmploymentProof(id, proof) {
    try {
        const { contract } = await connectToNetwork(`user-${id}`);
        proof.id = uuidv1();
        const result = await contract.submitTransaction(
            "addEmploymentProof",
            id,
            JSON.stringify(proof)
        );
        const approval = new Approvals({
            approver: proof.companyId,
            proofId: proof.id,
            proofType: "EMPLOYMENT",
            dump: proof,
            candidateId: id,
        });

        await approval.save();
        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = addEmploymentProof;
