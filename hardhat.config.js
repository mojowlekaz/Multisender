require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-ethers');

// const INFURA_API_KEY = "9c4d37d7dd984bb2b652d085e142ddf5";

const SEPOLIA_PRIVATE_KEY =
  "74575ba404901e7dbaf30578fb6706d08fe2e6781e5438f0a95c5e0ec2ce487b";

module.exports = {
  solidity: { version: "0.8.20" },

  networks: {
    testnet: {
      url: "https://sepolia.infura.io/v3/9c4d37d7dd984bb2b652d085e142ddf5",
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
