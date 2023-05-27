const { Gateway, Wallets } = require("fabric-network");
const path = require("path");

async function connectToNetwork() {
  const ccpPath = path.resolve(__dirname, "connection.json");
  const walletPath = path.resolve(__dirname, "wallet");

  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const identity = await wallet.get("user1");

  const gateway = new Gateway();
  await gateway.connect(ccpPath, {
    wallet,
    identity: "user1",
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork("mychannel");
  const contract = network.getContract("identity");

  return contract;
}

module.exports = connectToNetwork;
