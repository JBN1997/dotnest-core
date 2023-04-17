import { MainEntity } from '@common/entities/snapshot/main.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserLog } from './user-log.entity';
import { UserSnapshot } from './user-snapshot.entity';

@Entity()
export class User extends MainEntity<User, UserSnapshot, UserLog> {
   @Column({ unique: true })
   username: string;

   @Column()
   password: string;

   @OneToMany(() => UserLog, (versioned) => versioned.main, {
      cascade: true,
   })
   logs: UserLog[];

   @OneToOne(() => UserSnapshot, { cascade: true, nullable: true })
   @JoinColumn()
   lastVersion: UserSnapshot;

   @OneToMany(() => UserSnapshot, (versioned) => versioned.mainEntity, {
      cascade: true,
   })
   versions: UserSnapshot[];

   public setPassword(password: string) {
      this.password = password;
   }

   public setUsername(username: string) {
      this.username = username;
   }
}
