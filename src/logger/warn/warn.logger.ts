import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class WarnLogger extends ConsoleLogger {
   constructor() {
      super();
   }

   log(message: string, stack?: string, context?: string) {
      this.warn(message, stack, context);
   }
}
