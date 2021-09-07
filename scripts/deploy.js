// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
var sleep = require('sleep');

let greeter, token, nft

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Greeter = await ethers.getContractFactory("Greeter");
  greeter = await Greeter.deploy("Hello, World!");

  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy();

  const NFT = await ethers.getContractFactory("NFT")
  nft = await NFT.deploy()


  console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", token.address);
  console.log("NFT deployed to:", nft.address);

  saveFrontendFiles()

  //wait for 60 seconds before verify
  await sleep.sleep(60)

  // verify contracts
  //npx hardhat clean will clear `ENOENT: no such file or directory` error

  await hre.run("verify:verify", {
      address: nft.address,
      constructorArguments: [],
  })

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
      Greeter: greeter.address,
      Token: token.address,
      NFT: nft.address
      }, undefined, 2)
  );

  const GreeterArt = artifacts.readArtifactSync("Greeter");
  const TokenArt = artifacts.readArtifactSync("Token");
  const NFTArt = artifacts.readArtifactSync("NFT");


  fs.writeFileSync(contractsDir + "/abis/Greeter.json",JSON.stringify(GreeterArt, null, 2));
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
