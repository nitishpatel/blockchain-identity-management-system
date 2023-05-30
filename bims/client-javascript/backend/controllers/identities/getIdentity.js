/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function getIdentity(id) {
    const { contract } = await connectToNetwork();
    const result = await contract.evaluateTransaction("getIdentity", id);
    console.log(result.toString());
    const data = JSON.parse(result.toString());
    data.employmentProofs = data.employmentProofs.map((proof) =>
        JSON.parse(proof)
    );
    data.educationProofs = data.educationProofs.map((proof) =>
        typeof proof === "string" ? JSON.parse(proof) : proof
    );
    return data;
}

module.exports = getIdentity;
