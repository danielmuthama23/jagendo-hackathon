import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);
  private vectorStore: HNSWLib;
  private chain: RetrievalQAChain;

  constructor(private configService: ConfigService) {
    this.initializeModel();
  }

  private async initializeModel() {
    try {
      const model = new OpenAI({
        openAIApiKey: this.configService.get('OPENAI_API_KEY'),
        temperature: 0.5,
      });

      // Initialize with sample data (replace with your data source)
      const docs = [
        new Document({ pageContent: 'Jagedo is a service marketplace platform' }),
        // Add more documents from your knowledge base
      ];

      this.vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({
          openAIApiKey: this.configService.get('OPENAI_API_KEY'),
        })
      );

      this.chain = RetrievalQAChain.fromLLM(model, this.vectorStore.asRetriever());
    } catch (error) {
      this.logger.error('Failed to initialize RAG model', error.stack);
    }
  }

  async queryKnowledgeBase(question: string): Promise<string> {
    try {
      if (!this.chain) throw new Error('RAG model not initialized');
      
      const response = await this.chain.call({
        query: question,
      });

      return response.text;
    } catch (error) {
      this.logger.error(`RAG query failed: ${error.message}`, error.stack);
      throw new Error('Failed to process query');
    }
  }

  async addDocuments(documents: Document[]) {
    await this.vectorStore.addDocuments(documents);
  }
}