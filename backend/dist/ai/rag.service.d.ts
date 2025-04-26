import { ConfigService } from '@nestjs/config';
import { Document } from 'langchain/document';
export declare class RagService {
    private configService;
    private readonly logger;
    private vectorStore;
    private chain;
    constructor(configService: ConfigService);
    private initializeModel;
    queryKnowledgeBase(question: string): Promise<string>;
    addDocuments(documents: Document[]): Promise<void>;
}
