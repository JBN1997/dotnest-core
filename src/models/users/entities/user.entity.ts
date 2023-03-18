import { CoreEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
   @Column({ unique: true })
   username: string;

   @Column()
   password: string;

   @Column()
   email: string;
}
