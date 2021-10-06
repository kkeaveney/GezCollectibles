const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2, addr3, addr4
    const maxNftSupply = 11111;
    const maxPurchase = 10;
    const price = parseEther('0.1')

    let t1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    let t2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    let t3 = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    let t4 = '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc';

    beforeEach(async () =>{
        const currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy('MADDOGZ', 'MDZ', maxNftSupply, maxPurchase);

        [owner, addr1, addr2, addr3, addr4, _] = await ethers.getSigners();
        await nft.flipSaleIsActive() // Activate Sale
        await nft.setBaseURI('www.one.com')
    })

    describe('Ownership', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })

        it('mints first 4 NFTs to team', async () => {
            expect(await nft.totalSupply()).to.eq(4)
            expect(await nft.ownerOf(0)).to.eq(t1)
            expect(await nft.ownerOf(1)).to.eq(t2)
            expect(await nft.ownerOf(2)).to.eq(t3)
            expect(await nft.ownerOf(3)).to.eq(t4)
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
            let tx = await nft.connect(addr4).mint(amount, {value: parseEther('0.8')})

            let receipt = await tx.wait()
            let event = receipt.events[0].args
            // Team has already minted 4 NFTs
            expect(event[1]).to.eq(addr4.address)
            expect(event[2]).to.eq(5)
            // Check NFT balances
            expect(await nft.balanceOf(addr4.address)).to.eq(10)
            expect(await nft.totalSupply()).to.eq(14)
            // Remaining unminted tokens
            let totalSupply = await nft.totalSupply()
            expect(maxNftSupply - totalSupply).to.eq(11097)
        })
    })
})

