const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2, totalSupply

    beforeEach(async () =>{
        const currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy();

        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe('Ownership', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })
    })
    describe('Trade NFT', async () => {
        it('should transfer NFT ownership to purchaser, emit purchase event', async () => {
            await nft.mint('www.ipfs.co.uk', parseEther('0.9'))
            let price = '1' // 1 ether
            let id = 1;
            let tokenURI  = await nft.tokenURI(id)

            let tx = await nft.connect(addr1).buy(id, { value: parseEther(price)})
            expect(await nft.balanceOf(addr1.address)).to.eq(price)
        })
    })
})

