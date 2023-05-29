/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function addEmploymentProof(id, proof) {
    try {
        const { contract } = await connectToNetwork(`user-${id}`);
        const result = await contract.submitTransaction(
            "addEmploymentProof",
            id,
            JSON.stringify(proof)
        );

        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = addEmploymentProof;
