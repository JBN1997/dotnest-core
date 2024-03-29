import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/module';
import { EnvConfigService } from '@config/env/env.service';
import { HttpExceptionFilter } from '@common/exceptions/http.exception';
import { ErrorLogger } from '@logger/error/error.logger';
import { WarnLogger } from '@logger/warn/warn.logger';
import { UserProfile } from '@models/profiles/user.profile';
import { Mapper } from '@nartc/automapper';

class Server {
   private static instance: Server;

   private app: INestApplication;
   private readonly logger = new Logger(Server.name);

   constructor() {
      this.initializateNestApplication();
   }

   public static getInstance(): Server {
      if (this.instance) return this.instance;

      return (this.instance = new Server());
   }

   private async initializateNestApplication() {
      this.addProfiles();

      await Promise.all([
         await this.createAppModule(),
         await this.configureAppModule(),
         await this.listen(),
      ]);
   }

   private async createAppModule() {
      this.app = await NestFactory.create(AppModule, { bodyParser: true });
   }

   private configureAppModule() {
      this.app.useGlobalFilters(new HttpExceptionFilter());
      this.app.enableCors({
         allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization'
         ],
      });
      this.app.useLogger([
         this.app.get(ErrorLogger),
         this.app.get(WarnLogger)
      ]);
   }

   private async listen() {
      const envConfigService = this.app.get(EnvConfigService);
      await this.app.listen(envConfigService.port);
      this.logger.debug(`Application is running on: ${await this.app.getUrl()}`);
   }

   private addProfiles() {
      Mapper.addProfile(UserProfile);
   }
}

export default Server;
