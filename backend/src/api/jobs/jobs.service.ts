// jobs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { BlockchainService } from '../../blockchain/blockchain.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private blockchainService: BlockchainService,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  async create(): Promise<Job> {
    const job = this.jobsRepository.create();
    const savedJob = await this.jobsRepository.save(job);
    
    // Example blockchain interaction
    await this.blockchainService.createJobContract(savedJob.id);
    
    return savedJob;
  }
}