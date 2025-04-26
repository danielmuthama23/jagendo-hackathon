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
exports.Web3Service = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const config_1 = require("@nestjs/config");
let Web3Service = class Web3Service {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        this.initializeProvider();
    }
    initializeProvider() {
        const rpcUrl = this.configService.get('BLOCKCHAIN_RPC_URL');
        const privateKey = this.configService.get('WALLET_PRIVATE_KEY');
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
        this.signer = new ethers_1.ethers.Wallet(privateKey, this.provider);
    }
    async getNetworkInfo() {
        return {
            chainId: await this.provider.getNetwork().then(n => n.chainId),
            blockNumber: await this.provider.getBlockNumber(),
        };
    }
    async getBalance(address) {
        const balance = await this.provider.getBalance(address);
        return ethers_1.ethers.utils.formatEther(balance);
    }
    async sendTransaction(to, value) {
        const tx = await this.signer.sendTransaction({
            to,
            value: ethers_1.ethers.utils.parseEther(value)
        });
        return tx.wait();
    }
    getSigner() {
        return this.signer;
    }
    getProvider() {
        return this.provider;
    }
};
exports.Web3Service = Web3Service;
exports.Web3Service = Web3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Web3Service);
