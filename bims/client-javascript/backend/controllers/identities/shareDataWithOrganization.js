/* eslint-disable quotes */
/* eslint-disable strict */
const connectToNetwork = require("../../../network");

async function shareDataWithOrganization(id, organizationId) {
    try {
        const { contract } = await connectToNetwork(`user-${id}`);
        // GET THE x509 IDENTITY OF THE ORGANIZATION
        const result = await contract.submitTransaction(
            "shareDataWithOrganization",
            id,
            organizationId
        );

        return JSON.parse(result.toString());
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    }
}

module.exports = shareDataWithOrganization;
