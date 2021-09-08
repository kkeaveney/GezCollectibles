const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2

    beforeEach(async () =>{
        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe('Deployment', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })
    })

    describe('Minting', async () => {
        it('should mint NFTs', async () => {
            nft.mint('www.www', '1')
            expect(await nft.ownerOf(1)).to.equal(nft.address)
            expect(await nft.totalSupply()).to.equal(1) // contract is the NFT owner
            expect(await nft.balanceOf(nft.address)).to.equal(1)
        })
    })
    describe('Transfer NFT ownership', async () => {
        it('should transfer NFT ownership to the contract', async () => {
            await nft.mint('www.www', '1')
        })
    })

})

