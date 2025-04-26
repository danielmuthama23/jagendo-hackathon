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
var NftService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let NftService = NftService_1 = class NftService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(NftService_1.name);
        this.openai = new openai_1.OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }
    async generateNftMetadata(attributes) {
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
        }
        catch (error) {
            this.logger.error(`NFT metadata generation failed: ${error.message}`, error.stack);
            throw new Error('Failed to generate NFT metadata');
        }
    }
    async generateNftDescription(metadata) {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{
                        role: "system",
                        content: `Generate a compelling description for an NFT with metadata: ${JSON.stringify(metadata)}`
                    }],
                model: "gpt-4"
            });
            return completion.choices[0].message.content;
        }
        catch (error) {
            this.logger.error(`NFT description generation failed: ${error.message}`, error.stack);
            throw new Error('Failed to generate NFT description');
        }
    }
};
exports.NftService = NftService;
exports.NftService = NftService = NftService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NftService);
