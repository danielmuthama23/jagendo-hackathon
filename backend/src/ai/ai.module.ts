import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RagService } from './rag.service';
import { NftService } from './nft.service';

@Module({
  imports: [ConfigModule],
  providers: [RagService, NftService],
  exports: [RagService, NftService],
})
export class AiModule {}