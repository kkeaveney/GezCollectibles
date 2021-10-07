const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2
    const maxNftSupply = 11111;
    const startingIndex = 0;
    let baseURL = "www.aaa.com"

    //const price = parseEther('0.1')

    beforeEach(async () =>{
        const currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy('MADDOGZ', 'MDZ', baseURL, startingIndex);

        [owner, addr1, addr2, _] = await ethers.getSigners();
        await nft.flipSaleIsActive() // Activate Sale
        await nft.setBaseURI('www.one.com')
    })

    describe('Ownership', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })
    })

    describe('Minting before sale is active', async () => {
        it('should not mint as sale is inactive', async () => {
            await nft.flipSaleIsActive() // inactive sale
            await expect(nft.mint(5)).to.to.revertedWith("Sale must be active for minting")
        })
    })

    describe('Minting limited number of NFTs', async () => {
        it('exceeds maximum number of Mints', async () => {
            await expect(nft.mint(25)).to.be.revertedWith('Can only mint 10 NFTs at a time')
        })
    })
    describe('Trade NFT with non-minted NFT', async () => {
        it('should revert with non-exsistent id', async () => {
            let price = '1' // 1 ether
            let id = 20;
            await expect(
                nft.connect(addr1).buy(id)).to.be.revertedWith("Error, wrong Token id")
        })
    })
    describe('Trade NFT', async () => {
        it('should transfer NFT ownership to purchaser, emit purchase event', async () => {
            let amount = 10
            let tx = await nft.connect(addr1).mint(amount, {value: parseEther('0.8')})

            addr1balance = await web3.eth.getBalance(addr1.address);
            let receipt = await tx.wait()
            let event = receipt.events[0].args
            expect(event[1]).to.eq(addr1.address)
            expect(event[2]).to.eq(1)
            // Check NFT balances
            expect(await nft.balanceOf(addr1.address)).to.eq(10)
            expect(await nft.totalSupply()).to.eq(10)
            expect(await nft.balanceOf(nft.address)).to.eq(0)
            // Remaining unminted tokens
            let totalSupply = await nft.totalSupply()
            expect(maxNftSupply - totalSupply).to.eq(11101)
        })
    })
})

