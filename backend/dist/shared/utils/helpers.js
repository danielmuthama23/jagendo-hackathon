"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const common_1 = require("@nestjs/common");
class Helpers {
    static parsePaginationParams(page, limit) {
        page = page || 1;
        limit = limit || 10;
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Invalid pagination parameters');
        }
        return {
            skip: (page - 1) * limit,
            take: limit,
        };
    }
    static generateUniqueId(prefix = 'JAG') {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    static sanitizeUser(user) {
        const { password, ...sanitized } = user;
        return sanitized;
    }
}
exports.Helpers = Helpers;
