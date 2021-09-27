const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2, totalSupply
    const maxNftSupply = 20;

    beforeEach(async () =>{
        const currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy('MADDOGZ', 'MDZ', maxNftSupply, currentBlock);

        [owner, addr1, addr2, _] = await ethers.getSigners();
        await nft.flipSaleIsActive() // Activate Sale
    })

    describe('Ownership', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })
    })

    describe('Minting before sale is active', async () => {
        it('should not mint as sale is inactive', async () => {
            await nft.flipSaleIsActive() // inactive sale
            await expect(nft.mint('www.ipfs.co.uk', parseEther('0.9'), 5)).to.to.revertedWith("Sale must be active for minting")
        })
    })

    describe('Minting limited number of NFTs', async () => {
        it('exceeds maximum number of Mints', async () => {
            await expect(nft.mint('www.ipfs.co.uk', parseEther('0.9'), 25)).to.be.revertedWith('Can only mint 20 NFTs at a time')
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
            await nft.mint('www.ipfs.co.uk', parseEther('0.9'), 20)
            // let price = '1' // 1 ether
            // let id = 1;
            // let tokenURI  = await nft.tokenURI(id)

            // addr1balance = await web3.eth.getBalance(addr1.address);
            // let tx = await nft.connect(addr1).buy(id, { value: parseEther(price)})
            // let receipt = await tx.wait()
            // let event = receipt.events[2].args
            // expect(event[0]).to.eq(addr1.address)
            // expect(event[1]).to.eq(parseEther('0.9'))
            // expect(event[2]).to.eq(1)
            // expect(event[3]).to.eq(tokenURI)
            // // Check NFT balances
            // expect(await nft.balanceOf(addr1.address)).to.eq(price)
            // let balance = await nft.totalSupply()
            // console.log(balance.toString())
            //expect(await nft.balanceOf(nft.address)).to.eq(totalSupply - price)
        })
    })
})

