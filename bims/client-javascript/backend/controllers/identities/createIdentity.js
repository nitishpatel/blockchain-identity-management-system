/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function createIdentity(id, name) {
    try {
        const { contract } = await connectToNetwork();
        const result = await contract.submitTransaction(
            "createIdentity",
            id,
            name
        );

        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = createIdentity;
