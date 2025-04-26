const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Jagedo Contracts", function () {
  let escrow, skillNFT, owner, client, worker;

  beforeEach(async () => {
    [owner, client, worker] = await ethers.getSigners();
    
    const Escrow = await ethers.getContractFactory("JagedoEscrow");
    escrow = await Escrow.deploy();
    
    const SkillNFT = await ethers.getContractFactory("SkillNFT");
    skillNFT = await SkillNFT.deploy();
  });

  describe("Escrow", () => {
    it("Should create and release escrow", async () => {
      const jobId = ethers.keccak256(ethers.toUtf8Bytes("job1"));
      await escrow.connect(client).createEscrow(jobId, worker.address, {
        value: ethers.parseEther("1")
      });
      
      await escrow.connect(owner).releaseEscrow(jobId);
      expect(await escrow.escrows(jobId).status).to.equal(2); // COMPLETED
    });
  });

  describe("SkillNFT", () => {
    it("Should mint valid skill NFT", async () => {
      await skillNFT.connect(owner).mint(
        worker.address,
        "Plumbing",
        Math.floor(Date.now()/1000) + 31536000 // 1 year expiry
      );
      expect(await skillNFT.ownerOf(0)).to.equal(worker.address);
    });
  });
});