import { registerAs } from '@nestjs/config';
import { IDBConfig } from './db.interface';

export default registerAs(
   'db',
   (): IDBConfig => ({
      hostDB: process.env.DB_HOST,
      typeDB: process.env.DB_TYPE,
      portDB: Number(process.env.DB_PORT),
      databaseDB: process.env.DB_DATABASE,
      usernameDB: process.env.DB_USERNAME,
      passwordDB: process.env.DB_PASSWORD,
   }),
);
