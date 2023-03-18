import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class CoreEntity extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   createdAt: Date;

   constructor() {
      super();
      this.id = uuid();
   }
}
