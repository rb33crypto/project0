const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('Counter', () =>{
    let counter

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter', 1)
    })

    describe('Deployment', () => {
        
    it('sets the initial count', async () =>{
        //fetch the count and make sure it is correct]

        const Counter = await ethers.getContractFactory('Counter')
        const counter = await Counter.deploy('My Counter', 1)
        const count = await counter.count()
        expect(count).to.equal(1)
    })

    it('sets the initial name', async () =>{
        //fetch the count and make sure it is correct]

        const Counter = await ethers.getContractFactory('Counter')
        const counter = await Counter.deploy('My Counter', 1)
        const name = await counter.name()
        expect(name).to.equal('My Counter')
    })
    })

    describe('Counting', ()=> {
        let transaction
        
        it('increments the count', async () =>{
            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(2)
        })
    })

})
