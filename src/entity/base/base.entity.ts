import { BaseEntity as TypeOrmBaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class BaseEntity extends TypeOrmBaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   createdAt: Date;

   constructor() {
      super();
      this.id = uuid();
   }
}
