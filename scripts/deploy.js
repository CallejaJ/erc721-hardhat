const hre = require("hardhat");

async function main() {
  // Get the deployer address
  const [deployer] = await hre.ethers.getSigners();

  // Check if deployer exists
  if (!deployer) {
    console.error("No deployer account found. Check your configuration.");
    process.exit(1);
  }

  console.log("Deploying with account:", deployer.address);

  // Get the contract factory
  const MyToken = await hre.ethers.getContractFactory("MyToken");

  // Deploy the contract
  console.log("Deploying contract...");
  const myToken = await MyToken.deploy(deployer.address);

  // Wait for deployment to finish
  await myToken.waitForDeployment();

  // Get the deployed contract address
  const address = await myToken.getAddress();
  console.log("Contract deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
