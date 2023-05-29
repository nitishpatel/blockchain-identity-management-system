/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");
const uuidv1 = require("uuid/v1");

async function addEducationProof(id, proof) {
    try {
        const { contract } = await connectToNetwork(`user-${id}`);

        proof.id = uuidv1();
        const result = await contract.submitTransaction(
            "addEducationProof",
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

module.exports = addEducationProof;
