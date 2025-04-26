import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class NftService {
  private readonly logger = new Logger(NftService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async generateNftMetadata(attributes: Record<string, any>): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{
          role: "system",
          content: "Generate JSON metadata for an NFT based on these attributes: " + 
                   JSON.stringify(attributes)
        }],
        model: "gpt-4-1106-preview",
        response_format: { type: "json_object" }
      });

      return completion.choices[0].message.content;
    } catch (error) {
      this.logger.error(`NFT metadata generation failed: ${error.message}`, error.stack);
      throw new Error('Failed to generate NFT metadata');
    }
  }

  async generateNftDescription(metadata: any): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{
          role: "system",
          content: `Generate a compelling description for an NFT with metadata: ${JSON.stringify(metadata)}`
        }],
        model: "gpt-4"
      });

      return completion.choices[0].message.content;
    } catch (error) {
      this.logger.error(`NFT description generation failed: ${error.message}`, error.stack);
      throw new Error('Failed to generate NFT description');
    }
  }
}