import { Injectable } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { ConfigService } from '@nestjs/config';
import { Contract, ContractInterface } from 'ethers';

@Injectable()
export class ContractService {
  constructor(
    private web3Service: Web3Service,
    private configService: ConfigService
  ) {}

  private getContract(contractName: string): Contract {
    const address = this.configService.get<string>(`${contractName}_ADDRESS`);
    const abi: ContractInterface = JSON.parse(
      this.configService.get<string>(`${contractName}_ABI`)
    );

    return new Contract(
      address,
      abi,
      this.web3Service.getSigner()
    );
  }

  async deployContract(abi: ContractInterface, bytecode: string, args: any[]) {
    const factory = new ethers.ContractFactory(
      abi,
      bytecode,
      this.web3Service.getSigner()
    );
    return factory.deploy(...args);
  }

  async callContractMethod(
    contractName: string,
    methodName: string,
    args: any[]
  ) {
    const contract = this.getContract(contractName);
    return contract[methodName](...args);
  }

  async getContractEventLogs(
    contractName: string,
    eventName: string,
    fromBlock?: number
  ) {
    const contract = this.getContract(contractName);
    const filter = contract.filters[eventName]();
    return contract.queryFilter(filter, fromBlock);
  }

  // Specific contract interactions
  async mintSkillNFT(contractAddress: string, to: string, tokenId: number) {
    const contract = this.getContract('SkillNFT');
    return contract.mint(to, tokenId);
  }

  async createEscrow(jobId: string, amount: string) {
    const contract = this.getContract('Escrow');
    return contract.create(jobId, {
      value: ethers.utils.parseEther(amount)
    });
  }
}