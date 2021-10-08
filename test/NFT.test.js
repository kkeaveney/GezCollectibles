const { expect } = require('chai')
const { ethers, web3 } = require('hardhat')
const { parseEther } = require("ethers/lib/utils");


describe('NFT', function () {
    let nft, owner, token, addr1, addr2, vault, vault2, currentBlock
    const maxNftSupply = 11111;
    const maxPurchase = 10;
    const price = parseEther('0.8')


    beforeEach(async () =>{
        currentBlock = ethers.BigNumber.from(
        await ethers.provider.getBlockNumber())

        const NFT = await ethers.getContractFactory('NFT');
        nft = await NFT.deploy('MADDOGZ', 'MDZ', maxNftSupply, maxPurchase);

        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy('NFToken', 'NFT');

        [owner, addr1, addr2, vault, vault2, _] = await ethers.getSigners();

        await nft.flipSaleIsActive() // Activate Sale
        await nft.setBaseURI('www.batz.com')
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

    describe('Mint reserve allocation', async () => {
        it('should revert with non-contract owner', async () => {
            await(expect(nft.connect(addr1).reserveTokens()).to.be.revertedWith("Ownable: caller is not the owner"))
        })

        it('should allocate allocation to contract owner', async () => {
            await nft.reserveTokens()
            expect(await nft.balanceOf(owner.address)).to.eq(20)
        })

    })
    describe('Trade NFT', async () => {

        it('restricts the first 20 NFTs to be minted per transaction', async () => {
            await(expect(nft.mint(2, { value: price })).to.be.revertedWith("Max 1 Free Per Tx"))
        })
        it('should transfer NFT ownership to purchaser, emit purchase event', async () => {
            // Mint 20 free mints
            for(let i = 1; i <= 20; i++) {
                await nft.mint(1, {value: parseEther('0')})
            }
            let amount = 10
            let tx = await nft.connect(addr1).mint(amount, {value: price})

            addr1balance = await web3.eth.getBalance(addr1.address);
            let receipt = await tx.wait()
            let event = receipt.events[0].args
            expect(event[1]).to.eq(addr1.address)
            expect(event[2]).to.eq(21) // NFT minted after free 20
            // Check NFT balances
            let totalSupply = await nft.totalSupply()
            expect(await nft.balanceOf(addr1.address)).to.eq(10)
            expect(totalSupply).to.eq(30) // including free 20
            expect(await nft.balanceOf(nft.address)).to.eq(0)
            // Remaining unminted tokens
            expect(maxNftSupply - totalSupply ).to.eq(11081)
            expect(await nft.tokenOfOwnerByIndex(addr1.address,0)).to.eq(21)
            expect(await nft.tokenByIndex(0)).to.eq(1)
            // Reserve tokens
            expect(await nft.balanceOf(owner.address)).to.eq(20)
            await nft.reserveTokens()
            expect(await nft.balanceOf(owner.address)).to.eq(40)
            expect(await nft.totalSupply()).to.eq(50)


        })
    })

    describe('Vault access', async () => {
        it('prevents non-owners to change vault address', async () => {
            await(expect(nft.connect(addr2).setVault(vault.address)).to.be.revertedWith('Ownable: caller is not the owner'))
        })

        it('restricts withdrawal to the owner only', async () => {
            await(expect(nft.connect(addr2).withdraw(1)).to.be.revertedWith('Ownable: caller is not the owner'))
        })

        it('it allows the owner to change vault address', async () => {
            // Mint 20 free mints
            for(let i = 1; i <= 20; i++) {
                await nft.mint(1, {value: parseEther('0')})
            }
            let amount = 10
            // Mint tokens, confirm contract balance
            await nft.connect(addr1).mint(amount, {value: price})
            expect(await web3.eth.getBalance(nft.address)).to.eq(parseEther('0.8'))
            await nft.setVault(vault2.address)
            // confirm change of vault address
            expect(await nft.vault()).to.eq(vault2.address)
            // check vault balance
            expect(await web3.eth.getBalance(vault2.address)).to.eq(parseEther('10000'))
            await nft.withdraw(parseEther('0.8'))
            expect(await web3.eth.getBalance(nft.address)).to.eq(parseEther('0'))
            expect(await web3.eth.getBalance(vault2.address)).to.eq(parseEther('10000.8'))
        })

        it('forward ERC20 tokens', async () => {
            let amount = '100'
            // Transfer ERC20s
            await token.transfer(nft.address, parseEther(amount))
            expect(await token.balanceOf(nft.address)).to.eq(parseEther(amount))
            // vault hasn't been set yet
            await (expect(nft.forwardERC20s(token.address, 100))).to.be.revertedWith('no vault')
            // set vault and transfer ERC20s
            await nft.setVault(vault2.address)
            await nft.forwardERC20s(token.address, parseEther(amount))
            // check balances
            expect(await token.balanceOf(vault2.address)).to.eq(parseEther('100'))
            expect(await token.balanceOf(nft.address)).to.eq(parseEther('0'))
        })
    })
})

