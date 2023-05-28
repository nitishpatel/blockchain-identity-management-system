/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function getIdentityUpdates(id) {
    const { contract } = await connectToNetwork();
    const result = await contract.evaluateTransaction("getIdentityUpdates", id);
    console.log(result.toString());
    const data = JSON.parse(result.toString());

    return data;
}

module.exports = getIdentityUpdates;
