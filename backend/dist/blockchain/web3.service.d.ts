import { OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
export declare class Web3Service implements OnModuleInit {
    private configService;
    private provider;
    private signer;
    private currentChainId;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private initializeProvider;
    getNetworkInfo(): Promise<{
        chainId: any;
        blockNumber: any;
    }>;
    getBalance(address: string): Promise<string>;
    sendTransaction(to: string, value: string): Promise<ethers.TransactionReceipt | null>;
    getSigner(): ethers.Wallet;
    getProvider(): ethers.providers.JsonRpcProvider;
}
