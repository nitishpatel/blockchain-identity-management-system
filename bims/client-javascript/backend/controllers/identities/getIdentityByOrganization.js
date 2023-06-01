/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function getIdentityForOrganization(id, userID) {
    const { contract } = await connectToNetwork(`user-${userID}`);
    const result = await contract.evaluateTransaction(
        "getIdentityForOrganization",
        id
    );
    console.log(result.toString());
    const data = JSON.parse(result.toString());
    data.employmentProofs = data.employmentProofs.map((proof) =>
        typeof proof === "string" ? JSON.parse(proof) : proof
    );
    data.educationProofs = data.educationProofs.map((proof) =>
        typeof proof === "string" ? JSON.parse(proof) : proof
    );
    return data;
}

module.exports = getIdentityForOrganization;
