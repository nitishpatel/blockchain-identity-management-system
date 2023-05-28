/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable strict */
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");

const fs = require("fs");

async function connectToNetwork(walletUser = "admin-1") {
    const ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
    );
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");

    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get(walletUser);
    if (!identity) {
        console.log(
            'An identity for the user "admin" does not exist in the wallet'
        );
        console.log("Run the enrollAdmin.js application before retrying");
        throw new Error(
            'An identity for the user "admin" does not exist in the wallet'
        );
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: walletUser,
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract("bims");

    return { contract, network };
}

module.exports = connectToNetwork;
