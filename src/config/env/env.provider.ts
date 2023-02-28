import { registerAs } from '@nestjs/config';
import { IEnviromentConfig } from '@config/env/env.interface';

export default registerAs(
   'env',
   (): IEnviromentConfig => ({
      port: Number(process.env.PORT),
   }),
);
