import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../api/users/users.service';
export declare class AuthMiddleware implements NestMiddleware {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private extractToken;
}
