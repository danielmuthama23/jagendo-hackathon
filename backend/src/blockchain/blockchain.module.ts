import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { ContractService } from './contract.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [Web3Service, ContractService],
  exports: [Web3Service, ContractService],
})
export class BlockchainModule {}