import { Web3Service } from './web3.service';
import { ConfigService } from '@nestjs/config';
import { ContractInterface } from 'ethers';
export declare class ContractService {
    private web3Service;
    private configService;
    constructor(web3Service: Web3Service, configService: ConfigService);
    private getContract;
    deployContract(abi: ContractInterface, bytecode: string, args: any[]): Promise<any>;
    callContractMethod(contractName: string, methodName: string, args: any[]): Promise<any>;
    getContractEventLogs(contractName: string, eventName: string, fromBlock?: number): Promise<(import("ethers").EventLog | import("ethers").Log)[]>;
    mintSkillNFT(contractAddress: string, to: string, tokenId: number): Promise<any>;
    createEscrow(jobId: string, amount: string): Promise<any>;
}
