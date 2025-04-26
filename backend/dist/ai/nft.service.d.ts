import { ConfigService } from '@nestjs/config';
export declare class NftService {
    private configService;
    private readonly logger;
    private openai;
    constructor(configService: ConfigService);
    generateNftMetadata(attributes: Record<string, any>): Promise<string>;
    generateNftDescription(metadata: any): Promise<string>;
}
