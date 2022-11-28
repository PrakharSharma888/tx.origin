const {expect} = require("chai")
const { BigNumber } = require("ethers")
const { ethers, waffle } = require("hardhat")

describe("Attack", function (){
    it("Should change the owner of the Good Contract", async () => {
        const [_, add1] = await ethers.getSigners();

        const goodContract = await ethers.getContractFactory("Good")
        const _goodContract = await goodContract.connect(add1).deploy()
        await _goodContract.deployed()

        console.log("Good Contract address :",_goodContract.address)

        const attackContract = await ethers.getContractFactory("Attack")
        const _attackContract = await attackContract.deploy(_goodContract.address)
        await _attackContract.deployed()

        console.log("Attack Contract address :",_attackContract.address)

        let tx = await _attackContract.connect(add1).attack()
        await tx.wait()

        expect(await _goodContract.owner()).to.equal(_attackContract.address);

    })
})