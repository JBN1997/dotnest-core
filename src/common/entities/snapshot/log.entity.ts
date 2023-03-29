import { Column } from "typeorm";
import { CoreEntity } from '@common/entities/base.entity';
import { SnapshotEntity } from '@common/entities/snapshot/snapshot.entity';
import { MainEntity } from '@common/entities/snapshot/main.entity';
import { LogAction } from "@common/enums/log-action.enum";

export abstract class LogEntity<
   TEntity extends MainEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TSnapshotEntity extends SnapshotEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TLogEntity extends LogEntity<TEntity, TSnapshotEntity, TLogEntity>
> extends CoreEntity {
   @Column({
      type: 'enum',
      enum: LogAction,
      default: LogAction.Create,
   })
   action: LogAction;

   @Column({ type: 'text' })
   oldValue: string;

   @Column({ type: 'text'})
   newValue: string;

   @Column({ type: 'varchar', length: 100 })
   columnName: string;

   abstract version: TSnapshotEntity;
   abstract main: TEntity;

   public setColumnName(columnName: string) {
      this.columnName = columnName;
   }

   public setNewValue(newValue: string) {
      this.newValue = newValue;
   }

   public setOldValue(oldValue: string) {
      this.oldValue = oldValue;
   }

   public setAction(action: LogAction) {
      this.action = action;
   }

   public setVersion(version: TSnapshotEntity) {
      this.version = version;
      this.setMain(version.getMainEntity());
   }

   public setMain(main: TEntity) {
      this.main = main;
   }
}