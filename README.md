# ERC721 Token Deployment Guide with Hardhat

This guide walks you through the process of deploying an ERC721 token smart contract using Hardhat.

## Prerequisites

* Node.js and npm installed
* Basic understanding of Ethereum and smart contracts

## Step 1: Project Setup

Create and initialize your Hardhat project:

```bash
mkdir my-nft-project
cd my-nft-project
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

Select "Create a JavaScript project" when prompted.

## Step 2: Install Dependencies

Install OpenZeppelin Contracts to use their ERC721 implementation:

```bash
npm install --save @openzeppelin/contracts
```

Install dotenv for environment variable management:

```bash
npm install --save-dev dotenv
```

## Step 3: Create the Contract

Create a file called `MyToken.sol` in the `contracts` directory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    constructor(address initialOwner) ERC721("MyToken", "MTK") Ownable(initialOwner) {}
}
```

## Step 4: Create a Deployment Script

Create a file called `deploy.js` in the `scripts` directory:

```javascript
const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  
  // Get the deployer address
  const [deployer] = await hre.ethers.getSigners();
  
  // Deploy the contract
  console.log("Deploying contract...");
  const myToken = await MyToken.deploy(deployer.address);
  
  // Wait for deployment to finish
  await myToken.waitForDeployment();
  
  // Get the deployed contract address
  const address = await myToken.getAddress();
  console.log("Contract deployed to:", address);
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
```

## Step 5: Configure Environment Variables

Create a `.env` file in the root directory:

```
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_api_key_here
```

## Step 6: Configure Hardhat

Update the `hardhat.config.js` file:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};
```

## Step 7: Compile the Contract

Compile your contract with:

```bash
npx hardhat compile
```

## Step 8: Deploy the Contract

### Local Development Network

To deploy to the local Hardhat network:

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

### Testnet (Sepolia)

To deploy to the Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Mainnet

To deploy to Ethereum mainnet:

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## Step 9: Verify Your Contract (Optional)

To verify your contract on Etherscan:

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS YOUR_INITIAL_OWNER_ADDRESS
```

## Troubleshooting

If you encounter errors during compilation or deployment:
1. Ensure all dependencies are installed correctly
2. Check that your contract file is in the proper directory
3. Verify your environment variables are set correctly
4. Clean and recompile your project:

```bash
npx hardhat clean
npx hardhat compile
```

## Next Steps

After deployment, you can start interacting with your contract by:
* Writing scripts to mint tokens
* Creating a front-end interface
* Extending your contract functionality
