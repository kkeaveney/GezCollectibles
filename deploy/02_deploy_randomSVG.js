let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')
const { parseEther } = require("ethers/lib/utils");

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    // If we are on a local development network, we need to deploy mocks!
    let linkTokenAddress
    let vrfCoordinatorAddress

    if (chainId == 31337) {
        let linkToken = await get('LinkToken')
        let VRFCoordinatorMock = await get('VRFCoordinatorMock')
        linkTokenAddress = linkToken.address
        vrfCoordinatorAddress = VRFCoordinatorMock.address
        additionalMessage = " --linkaddress " + linkTokenAddress
    } else {
        linkTokenAddress = networkConfig[chainId]['linkToken']
        vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
    }
    const keyHash = networkConfig[chainId]['keyHash']
    const fee = networkConfig[chainId]['fee']
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    let args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee]
    log("-------------------------")
    const RandomSVG = await deploy("RandomSVG", {
        from: deployer,
        args: args,
        log: true
    })
    log(`NFT created!`)
    const networkName = networkConfig[chainId]["name"]
    log(`Verify with:\n npx hardhat verify --network ${networkName} ${RandomSVG.address} ${args.toString().replace(/,/g, " ")}`)

    // fund with LINK
    let networkId = await getNetworkIdFromName(network.name)
    const fundAmount = networkConfig[networkId]['fundAmount']
    const linkTokenContract = await ethers.getContractFactory("LinkToken")
    const linkToken = new ethers.Contract(linkTokenAddress, linkTokenContract.interface, signer)
    let fund_tx = await linkToken.transfer(RandomSVG.address, fundAmount)
    await fund_tx.wait(1)

    // create an NFT by calling a random number
    const RandomSVGContract = await ethers.getContractFactory("RandomSVG")
    const randomSVG = new ethers.Contract(RandomSVG.address, RandomSVGContract.interface, signer)
    let creation_tx = await randomSVG.create({ gasLimit: 300000, value: parseEther('0.1') })
    let receipt = await creation_tx.wait(1)
    let tokenId = receipt.events[3].topics[2]
    log(`You've made an NFT with token number ${tokenId.toString()}`)
    log(`Wait for the Chainlink node to respond...`)
    if(chainId != 31337) {
        await new Promise(r => setTimeout(r, 180000))
        log('Finish minting')
        let finish_tx = await randomSVG.finishMint(tokenId, { gasLimit: 2000000 })
        await finish_tx.wait(1)
        log(`The tokenURI can be viewed here ${await randomSVG.tokenURI(tokenId)}`)
    } else {
        const VRFCoordinatorMock = await deployments.get("VRFCoordinatorMock")
        vrfCoordinator = await ethers.getContractAt("VRFCoordinatorMock", VRFCoordinatorMock.address, signer)
        let vrf_tx = await vrfCoordinator.callBackWithRandomness(receipt.logs[3].topics[1], 77777, randomSVG.address)
        await vrf_tx.wait(1)
        log("Finish the mint")
        let finish_tx = await randomSVG.finishMint(tokenId,  { gasLimit: 2000000 })
        await finish_tx.wait(1)
        log(`You can view the token URI here: ${await randomSVG.tokenURI(tokenId)}`)

    }

}

module.exports.tags = ['all', 'rsvg']