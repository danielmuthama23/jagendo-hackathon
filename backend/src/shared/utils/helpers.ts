import { BadRequestException } from '@nestjs/common';

export class Helpers {
  static parsePaginationParams(page: number, limit: number) {
    page = page || 1;
    limit = limit || 10;
    
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  static generateUniqueId(prefix = 'JAG'): string {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  static sanitizeUser(user: any) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}