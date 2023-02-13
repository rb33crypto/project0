const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RealEstate', () => {
    let realEstate, escrow
    let deployer, seller
    let nftID = 1
    let purchasePrice = ether(100)
    let escrowAmount = ether(20)



    beforeEach(async () => {

        //setup accounts
        accounts = await ethers.getSigner()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        inspector = accounts[2]
        lender = accounts[3]

        //load contracts
        const RealEstate = await ethers.getContractFactory('RealEstate')
        const Escrow = await ethers.getContractFactory('Escrow')

        //deploy contracts
        realEstate = await RealEstate.deploy()
        escrow = await Escrow.deploy(
            realEstate.address,
            purchasePrice,
            escrowAmount,
            seller.address,
            buyer.address,
            inspector.address,
            lender.address,
            nftID)

        //seller approves NFT
        transaction = await realEstate.connect(seller).approve(escrow.address,nftID)
            await transaction.wait()

    })

    describe('Deployment', async () => {

        it('send an NFT to the seller / deployer', async() =>{
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
        })
    })

    describe('Selling Real Estate', async () => {
        let balance, transaction

        it('executes successful transaction', async() =>{
            //expects seller to be NFT owner before the sale
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)

            //buyer deposits earnest
            transaction = await escrow.connect(buyer).depositEarnest({ value:(20)})

            //check escrow balance
            balance = await escrow.getBalance()
            console.log("escrow Balance:", ethers.utils.formatEther(balance))

            //Inspector update status
            transaction = await excrow.connect(inspector).updateInspectorStatus(true)
            await transaction.wait()
            console.log("inspector update status")

            //finanlize sale
            transaction = await escrow.connect(buyer).finalizeSale()
            await transaction.wait()
            console.log("Buyer finalizes sale")
        })
    })


})