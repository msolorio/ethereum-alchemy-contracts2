/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const {
  PRIVATE_KEY,
  ALCHEMY_API_URL,
  ETHERSCAN_API_KEY
} = process.env;

module.exports = {
  solidity: "0.8.3",
  defaultNetwork: 'ropsten',
  networks: {
    hardhat: {},
    ropsten: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: { apiKey: ETHERSCAN_API_KEY }
};
