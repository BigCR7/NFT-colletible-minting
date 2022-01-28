const { utils } = require("ethers");

async function main() {
    // const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("NFT_collectible");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy();

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // alphasale 3 NFTs by sending 0.18 ether
    txn = await contract.privateSale(3, { value: utils.parseEther('0.18') });
    await txn.wait()

    // presale 3 NFTs by sending 0.18 ether
    txn = await contract.presale(3, { value: utils.parseEther('0.24') });
    await txn.wait()

    // publicMint 3 NFTs by sending 0.3 ether
    txn = await contract.publicMint(3, { value: utils.parseEther('0.3') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });