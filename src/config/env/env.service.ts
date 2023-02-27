import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

@Injectable()
export class EnvConfigService {
   constructor(private configService: ConfigService) {
      config();
   }

   public get port(): number {
      return Number(this.configService.get<number>('env.port'));
   }
}
