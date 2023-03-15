import { JEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends JEntity {
   @Column({ unique: true })
   username: string;

   @Column()
   password: string;

   @Column()
   email: string;
}
