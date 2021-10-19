require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-typechain");
require("hardhat-deploy");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();
require("./tasks/accounts")
require("./tasks/balance")
require("./tasks/mint")


// help

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  // paths: {
  //   artifacts: './src/artifacts',
  // },
  networks: {
    hardhat: {
    },
    rinkeby: {
        url: process.env.RINKEBY_RPC_URL,
        accounts: [process.env.PRIVATE_KEYS],
        saveDeployments: true,
    },
  },
  solidity: {
    compilers: [
      // {
      //   version: "0.6.2",
      // },
      {
        version: "0.8.0",
      },
    ],
  },etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API
},
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
},
  feeCollector: {
      default: 1
  }
},

};

