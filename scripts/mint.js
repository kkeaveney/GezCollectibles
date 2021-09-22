// local deployment using hardhat
// run `npx hardhat node` to startup local instance

require("@nomiclabs/hardhat-web3")
require('dotenv').config()

const { create, globSource } = require('ipfs-http-client')
const ipfs = create('http://127.0.0.1:5002')
const fs = require('fs');
var sleep = require('sleep');

let nft

async function main() {
    // convenience check
    if(network.name == "hardhat") {
        console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which " +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
        )
    }

        let nftsData = []
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);
        console.log("Account balance:", (await deployer.getBalance()).toString());
        const NFT_Contract=JSON.parse(fs.readFileSync('src/contracts/abis/NFT.json', 'utf8'));
        const NFT_Address=JSON.parse(fs.readFileSync('src/contracts/contract-address.json', 'utf8'));

        nft = new ethers.Contract(NFT_Address.NFT, NFT_Contract.abi, deployer)
        console.log(nft.address)

        console.log('\nUploading images on IPFS...')
        let files = fs.readdirSync(`${__dirname}/gallery`);
        let upload = await ipfs.add(globSource(`${__dirname}/gallery`, { recursive: true }))

        console.log('\nPreparing metadata directory...')
        await fs.rmdirSync(`${__dirname}/metadata`, { recursive: true },); // callback
        await fs.mkdirSync(`${__dirname}/metadata`, { recursive: true },); // callback

        console.log('\nCreating metadata...')
        for(let i=0; i<files.length; i++){
            let metadata = JSON.stringify({
                "name": `${/[^.]*/.exec(files[i])[0]}`,
                "description": "D1g1t@l @rt - X, 24/2/21, ~GenZ",
                "image": `https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`
              }, null, '\t');

            var img = fs.readFileSync(`${__dirname}/gallery/${files[i]}`, {encoding: 'base64'});
            nftsData.push(metadata.slice(0, -2) + `,\n\t"img": "${img}"` + `,\n\t"id": ${i+1}\n}`)
            await fs.writeFileSync(`${__dirname}/metadata/${/[^.]*/.exec(files[i])[0]}.json`, metadata)

        }
            console.log('\nUploading metadata on IPFS...')
            files = fs.readdirSync(`${__dirname}/metadata`);
            upload = await ipfs.add(globSource(`${__dirname}/metadata`, { recursive: true }))
            console.log(`https://ipfs.io/ipfs/${upload.cid.toString()}/${files[0]}`)

            console.log('\nMinting NFTs...')
            for(let i=0; i<files.length; i++){
            await nft.mint(`https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`, web3.utils.toWei('0.001', 'Ether'))
        }
            for(let i=0;i<files.length; i++) {
            nftsData[i] = nftsData[i].slice(0, -2) + `,\n\t"price": ${await nft.price(i+1)},\n\t"uri": "${await nft.tokenURI(i+1)}"\n}` //add price&URI to nftsData
            console.log(`\n${i+1} NFT is minted with URI:\n${await nft.tokenURI(i+1)}`)
            }

            console.log('\nAggregating NFTs data...')
            if(fs.existsSync(`src/nftsData.js`)) {
            await fs.unlinkSync(`src/nftsData.js`)
        }
            await fs.writeFileSync(`src/nftsData.js`, `export const nftsData = [${nftsData}]`)
    }

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })