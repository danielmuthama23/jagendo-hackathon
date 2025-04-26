"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const web3_service_1 = require("./web3.service");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
let ContractService = class ContractService {
    constructor(web3Service, configService) {
        this.web3Service = web3Service;
        this.configService = configService;
    }
    getContract(contractName) {
        const address = this.configService.get(`${contractName}_ADDRESS`);
        const abi = JSON.parse(this.configService.get(`${contractName}_ABI`));
        return new ethers_1.Contract(address, abi, this.web3Service.getSigner());
    }
    async deployContract(abi, bytecode, args) {
        const factory = new ethers.ContractFactory(abi, bytecode, this.web3Service.getSigner());
        return factory.deploy(...args);
    }
    async callContractMethod(contractName, methodName, args) {
        const contract = this.getContract(contractName);
        return contract[methodName](...args);
    }
    async getContractEventLogs(contractName, eventName, fromBlock) {
        const contract = this.getContract(contractName);
        const filter = contract.filters[eventName]();
        return contract.queryFilter(filter, fromBlock);
    }
    // Specific contract interactions
    async mintSkillNFT(contractAddress, to, tokenId) {
        const contract = this.getContract('SkillNFT');
        return contract.mint(to, tokenId);
    }
    async createEscrow(jobId, amount) {
        const contract = this.getContract('Escrow');
        return contract.create(jobId, {
            value: ethers.utils.parseEther(amount)
        });
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [web3_service_1.Web3Service,
        config_1.ConfigService])
], ContractService);
