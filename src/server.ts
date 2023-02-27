import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/module';
import { EnvConfigService } from '@config/env/env.service';

class Server {
   private static instance: Server;
   private app: INestApplication;

   constructor() {
      this.initializateNestApplication();
   }

   public static getInstance(): Server {
      if (this.instance) return this.instance;

      return (this.instance = new Server());
   }

   private async initializateNestApplication() {
      await this.createAppModule();
      await this.listen();
   }

   private async createAppModule() {
      this.app = await NestFactory.create(AppModule);
   }

   private async listen() {
      const envConfigService: EnvConfigService = this.app.get('EnvConfigService');

      await this.app.listen(envConfigService.port);
   }
}

export default Server;
