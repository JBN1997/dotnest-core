import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

@Injectable()
export class DataBaseConfigService {
   constructor(private configService: ConfigService) {
      config();
   }

   public get hostDB(): string {
      return this.configService.get<string>('db.hostDB');
   }
}
