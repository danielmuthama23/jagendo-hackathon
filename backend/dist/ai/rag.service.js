"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RagService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
const openai_2 = require("langchain/embeddings/openai");
const document_1 = require("langchain/document");
let RagService = RagService_1 = class RagService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RagService_1.name);
        this.initializeModel();
    }
    async initializeModel() {
        try {
            const model = new openai_1.OpenAI({
                openAIApiKey: this.configService.get('OPENAI_API_KEY'),
                temperature: 0.5,
            });
            // Initialize with sample data (replace with your data source)
            const docs = [
                new document_1.Document({ pageContent: 'Jagedo is a service marketplace platform' }),
                // Add more documents from your knowledge base
            ];
            this.vectorStore = await hnswlib_1.HNSWLib.fromDocuments(docs, new openai_2.OpenAIEmbeddings({
                openAIApiKey: this.configService.get('OPENAI_API_KEY'),
            }));
            this.chain = chains_1.RetrievalQAChain.fromLLM(model, this.vectorStore.asRetriever());
        }
        catch (error) {
            this.logger.error('Failed to initialize RAG model', error.stack);
        }
    }
    async queryKnowledgeBase(question) {
        try {
            if (!this.chain)
                throw new Error('RAG model not initialized');
            const response = await this.chain.call({
                query: question,
            });
            return response.text;
        }
        catch (error) {
            this.logger.error(`RAG query failed: ${error.message}`, error.stack);
            throw new Error('Failed to process query');
        }
    }
    async addDocuments(documents) {
        await this.vectorStore.addDocuments(documents);
    }
};
exports.RagService = RagService;
exports.RagService = RagService = RagService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RagService);
