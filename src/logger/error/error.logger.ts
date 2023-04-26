import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class ErrorLogger extends ConsoleLogger {
   constructor() {
      super();
   }

   log(message: string, stack?: string, context?: string) {
      this.error(message, stack, context);
      //TODO: salvar no db error
   }
}
