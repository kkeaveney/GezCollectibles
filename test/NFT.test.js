const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner1, addr1
    const maxNftSupply = 11111;
    const maxPurchase = 10;
    const price = parseEther('0.1')

    let t1 = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
    let t2 = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';
    let t3 = '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E';
    let t4 = '0x2546BcD3c84621e976D8185a91A922aE77ECEc30';

    beforeEach(async () =>{
        const currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy('MADDOGZ', 'MDZ', maxNftSupply, maxPurchase);

        [owner1, addr1, _] = await ethers.getSigners();
        await nft.flipSaleIsActive() // Activate Sale
        await nft.setBaseURI('www.one.com')
    })

    describe('Ownership', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner1.address)
        })

        it('mints first 4 NFTs to team', async () => {
            expect(await nft.totalSupply()).to.eq(4)
            expect(await nft.ownerOf(0)).to.eq(t1)
            expect(await nft.balanceOf(t1)).to.eq(1)
            expect(await nft.ownerOf(1)).to.eq(t2)
            expect(await nft.balanceOf(t2)).to.eq(1)
            expect(await nft.ownerOf(2)).to.eq(t3)
            expect(await nft.balanceOf(t3)).to.eq(1)
            expect(await nft.ownerOf(3)).to.eq(t4)
            expect(await nft.balanceOf(t4)).to.eq(1)
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
                nft.buy(id)).to.be.revertedWith("Error, wrong Token id")
        })
    })
    describe('Trade NFT', async () => {
        it('should transfer NFT ownership to purchaser, emit purchase event', async () => {
            let amount = 10
            let tx = await nft.connect(addr1).mint(amount, {value: parseEther('0.8')})

            let receipt = await tx.wait()
            let event = receipt.events[0].args
            // Team has already minted 4 NFTs
            expect(event[1]).to.eq(addr1.address)
            expect(event[2]).to.eq(5)
            // Check NFT balances
            expect(await nft.balanceOf(addr1.address)).to.eq(10)
            expect(await nft.totalSupply()).to.eq(14)
            // Remaining unminted tokens
            let totalSupply = await nft.totalSupply()
            expect(maxNftSupply - totalSupply).to.eq(11097)
        })
    })

    describe('Withdraw funds', async () => {
        it('needs funds to withdraw', async () => {
            let amount = 10;
            expect(await web3.eth.getBalance(t1)).to.eq(parseEther('10000'))
            // Nothing to withdraw, balance remains unchanged
            nft.withdrawAll()
            expect(await web3.eth.getBalance(t1)).to.eq(parseEther('10000'))
            // Mint Tokens
            await nft.connect(addr1).mint(amount, { value : parseEther('0.8')})
            expect(await web3.eth.getBalance(nft.address)).to.eq(parseEther('0.8'))
            await nft.withdrawAll()
            // 1/4 of the balance sent to team
            expect(await web3.eth.getBalance(t1)).to.eq(parseEther('10000.2'))
            expect(await web3.eth.getBalance(t2)).to.eq(parseEther('10000.2'))
            expect(await web3.eth.getBalance(t3)).to.eq(parseEther('10000.2'))
            expect(await web3.eth.getBalance(t4)).to.eq(parseEther('10000.2'))
        })
    })
})

