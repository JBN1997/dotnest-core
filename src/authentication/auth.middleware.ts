import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
   constructor(private readonly jwtService: JwtService) {}

   async use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
         next();
         return;
      }

      try {
         const token = authHeader.split(' ')[1];
         const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
         req['user'] = decodedToken;
         next();
      } catch (e) {
         return res.status(401).send({ message: 'Unauthorized' });
      }
   }
}
