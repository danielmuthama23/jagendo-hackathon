export declare class Helpers {
    static parsePaginationParams(page: number, limit: number): {
        skip: number;
        take: number;
    };
    static generateUniqueId(prefix?: string): string;
    static sanitizeUser(user: any): any;
}
