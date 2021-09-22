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
    describe('Trade NFT', async () => {
        it('should transfer NFT ownership to purchaser', async () => {
            let price = '1' // 1 ether
            addr1balance = await web3.eth.getBalance(addr1.address);
            await nft.connect(addr1).buy(1, { value: parseEther(price)})

            // Check NFT balances
            expect(await nft.balanceOf(addr1.address)).to.eq(price)
            expect(await nft.balanceOf(nft.address)).to.eq(totalSupply - price)

            // // Check contract ETH balance
            balance = await web3.eth.getBalance(addr1.address);
            console.log(parseEther(price).toString())
            console.log(BigInt(addr1balance) - BigInt(price))
            //expect(BigInt(balance)).to.be.lt(BigInt(addr1balance) - BigInt(price))

        })
    })
})

