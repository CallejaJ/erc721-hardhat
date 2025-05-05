require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.local" });

const privateKey = process.env.PRIVATE_KEY || "";
// Asegúrate de que la clave privada tenga el formato correcto
const formattedKey = privateKey.startsWith("0x")
  ? privateKey
  : `0x${privateKey}`;

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614, // ID de cadena para Arbitrum Sepolia
      accounts: [formattedKey],
    },
  },
  sourcify: {
    enabled: true,
  },
};
