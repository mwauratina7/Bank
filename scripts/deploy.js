// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Compile the contract if not already compiled
  await hre.run("compile");

  // Get the contract factory
  const Bank = await hre.ethers.getContractFactory("Bank");

  console.log("Deploying Bank contract...");

  // Deploy contract
  const bank = await Bank.deploy();

  // Wait for deployment to finish
  await bank.waitForDeployment();

  console.log(`✅ Bank contract deployed at: ${await bank.getAddress()}`);
}

// Run the deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
