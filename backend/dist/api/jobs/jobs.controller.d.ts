import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getAllJobs(): Promise<Job[]>;
    createJob(): Promise<Job>;
}
