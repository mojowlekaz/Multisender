require("@nomicfoundation/hardhat-toolbox");

// require("@nomiclabs/hardhat-ethers");\
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MultiAirdropDispenserFactory = await ethers.getContractFactory(
    "MultiAirdropDispenser"
  );

  const constructorArgument = "0x098bB49E90697d76e3141f5B7f6045090bbB201B";
  const MultiAirdropDispenser = await MultiAirdropDispenserFactory.deploy(
    constructorArgument
  );

  console.log(
    "MultiAirdropDispenser address:",
    await MultiAirdropDispenser.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
