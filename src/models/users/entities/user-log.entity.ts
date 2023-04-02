import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LogEntity } from '@common/entities/snapshot/log.entity';
import { UserSnapshot } from '@models/entities/user-snapshot.entity';
import { User } from './user.entity';

@Entity()
export class UserLog extends LogEntity<User, UserSnapshot, UserLog> {
   @ManyToOne(() => User, (version) => version.logs)
   @JoinColumn()
   main: User;

   @ManyToOne(() => UserSnapshot, (version) => version.logs)
   @JoinColumn()
   version: UserSnapshot;
}
