/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function getIdentity(id) {
    const contract = await connectToNetwork();
    const result = await contract.evaluateTransaction("getIdentity", id);

    return JSON.parse(result.toString());
}

module.exports = getIdentity;
