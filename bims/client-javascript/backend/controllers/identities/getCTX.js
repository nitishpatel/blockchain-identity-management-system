/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function getCTX(id) {
    const contract = await connectToNetwork("user-nitish");
    const result = await contract.evaluateTransaction("getCTXAttrs");

    return JSON.parse(result.toString());
}

module.exports = getCTX;
