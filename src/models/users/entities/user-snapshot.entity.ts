import { SnapshotEntity } from '@common/entities/snapshot/snapshot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UserLog } from './user-log.entity';
import { User } from '@models/entities/user.entity';
import { UserRole } from '@models/enums/role.enum';
import { UserStatus } from '@models/enums/status.enum';

@Entity()
export class UserSnapshot extends SnapshotEntity<User, UserSnapshot, UserLog> {
   @Column()
   name: string;

   @Column()
   email: string;

   @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.Viewer,
   })
   role: UserRole;

   @Column({
      type: 'enum',
      enum: UserStatus,
      default: UserStatus.Inactive,
   })
   status: UserStatus;

   @OneToOne(() => UserSnapshot, { cascade: true, nullable: true })
   @JoinColumn()
   prevVersion: UserSnapshot;

   @ManyToOne(() => User, (main) => main.versions)
   @JoinColumn()
   mainEntity: User;

   @OneToMany(() => UserLog, (log) => log.version, {
      cascade: true,
   })
   logs: UserLog[];

   public isDirty(oldVersion: UserSnapshot): boolean {
      return (
         this.name !== oldVersion.name ||
         this.email !== oldVersion.email ||
         this.status !== oldVersion.status ||
         this.role !== oldVersion.role
      );
   }

   public copy(oldVersion: UserSnapshot): boolean {
      if (!oldVersion) {
         return false;
      }

      const { name, email, status, role } = oldVersion;
      this.name = name;
      this.email = email;
      this.status = status;
      this.role = role;

      return true;
   }
}
