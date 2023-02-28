import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
   hostDB: process.env.HOST_DB,
}));
