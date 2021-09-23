const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");

describe('NFT', function () {
    let NFT, nft, owner, addr1, addr2, totalSupply, balance

    beforeEach(async () =>{
        NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
        totalSupply = 20;
        // Mint 20 NFTs
        for(i=1;i<=totalSupply;i++){
            await nft.mint('www.ipfs.co.uk', parseEther('0.9'))
        }
    })

    describe('Deployment', async () => {
        it('should set the right owner', async () => {
            expect(await nft.owner()).to.equal(owner.address)
        })
    })

    describe('Minting', async () => {
        it('should mint NFT collection', async () => {
           expect(await nft.totalSupply()).to.eq(20)
        })
    })

    describe('Trade NFT with non-minted NFT', async () => {
        it('should revert with non-exsistent id', async () => {
            let price = '1' // 1 ether
            let id = 21;
            await expect(
                nft.connect(addr1).buy(id)).to.be.revertedWith("Error, wrong Token id")
        })
    })
    describe('Trade NFT', async () => {
        it('should transfer NFT ownership to purchaser', async () => {
            let price = '1' // 1 ether
            let id = 1;
            let tokenURI  = await nft.tokenURI(id)

            addr1balance = await web3.eth.getBalance(addr1.address);
            let tx = await nft.connect(addr1).buy(id, { value: parseEther(price)})
            let receipt = await tx.wait()
            //console.log(receipt)
            let event = receipt.events[2].args
            expect(event[0]).to.eq(addr1.address)
            expect(event[1]).to.eq(parseEther('0.9'))
            expect(event[2]).to.eq(1)
            expect(event[3]).to.eq(tokenURI)

            // Check NFT balances
            expect(await nft.balanceOf(addr1.address)).to.eq(price)
            expect(await nft.balanceOf(nft.address)).to.eq(totalSupply - price)
        })
    })
})

