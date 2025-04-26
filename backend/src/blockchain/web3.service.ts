import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Web3Service implements OnModuleInit {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private currentChainId: number;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.initializeProvider();
  }

  private initializeProvider() {
    const rpcUrl = this.configService.get<string>('BLOCKCHAIN_RPC_URL');
    const privateKey = this.configService.get<string>('WALLET_PRIVATE_KEY');
    
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  async getNetworkInfo() {
    return {
      chainId: await this.provider.getNetwork().then(n => n.chainId),
      blockNumber: await this.provider.getBlockNumber(),
    };
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  }

  async sendTransaction(to: string, value: string) {
    const tx = await this.signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(value)
    });
    return tx.wait();
  }

  getSigner() {
    return this.signer;
  }

  getProvider() {
    return this.provider;
  }
}