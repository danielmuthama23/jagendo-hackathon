import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { BlockchainService } from '../../blockchain/blockchain.service';
export declare class JobsService {
    private jobsRepository;
    private blockchainService;
    constructor(jobsRepository: Repository<Job>, blockchainService: BlockchainService);
    findAll(): Promise<Job[]>;
    create(): Promise<Job>;
}
