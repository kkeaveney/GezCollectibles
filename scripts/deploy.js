// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
var sleep = require('sleep');
const { network } = require("hardhat");

let token, nft

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy();

  const NFT = await ethers.getContractFactory("ERC20")
  nft = await NFT.deploy()

  console.log("Token deployed to:", token.address);
  console.log("NFT deployed to:", nft.address);

  //saveFrontendFiles()

  //wait for 60 seconds before verify
  await sleep.sleep(60)

  // verify contracts
  //npx hardhat clean will clear `ENOENT: no such file or directory` error
  if(network.name != "hardhat") {
    await hre.run("verify:verify", {
        address: nft.address,
        constructorArguments: [],
    })
  }
}

function saveFrontendFiles() {
  const contractsDir = __dirname + "/../src/contracts";
  const abisDir = __dirname + "/../src/contracts/abis";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
    fs.mkdirSync(abisDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({
      Token: token.address,
      NFT: nft.address
      }, undefined, 2)
  );

  const TokenArt = artifacts.readArtifactSync("Token");
  const NFTArt = artifacts.readArtifactSync("NFT");

  fs.writeFileSync(contractsDir + "/abis/Token.json",JSON.stringify(TokenArt, null, 2));
  fs.writeFileSync(contractsDir + "/abis/NFT.json",JSON.stringify(NFTArt, null, 2));
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
