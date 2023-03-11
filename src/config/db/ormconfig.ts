import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
   type: 'mysql', // ou o tipo de banco de dados que você está usando
   host: process.env.DB_HOST, // ou o host do seu banco de dados
   port: Number(process.env.DB_PORT), // ou a porta que seu banco de dados está usando
   username: process.env.DB_USERNAME, // ou seu nome de usuário do banco de dados
   password: process.env.DB_PASSWORD, // ou sua senha do banco de dados
   database: process.env.DB_DATABASE, // ou o nome do banco de dados que você está usando
   synchronize: true, // true - cria as tabelas do banco de dados
   logging: ['query', 'migration', 'error'],
   entities: [__dirname + '/../**/*.entity.js'],
   autoLoadEntities: true,

   // entities: [__dirname + '/**/*.entity.{js,ts}'],
   // entities: [User, UserVersion, UserLog],
   // subscribers: [UserLogSubscriber],
   // migrations: [__dirname + '/migrations/*.ts'], // caminho personalizado para migrations
};

export default config;
