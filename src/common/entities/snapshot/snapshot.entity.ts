import { CoreEntity } from '@common/entities/base.entity';
import { LogEntity } from '@common/entities/snapshot/log.entity';
import { MainEntity } from '@common/entities/snapshot/main.entity';

export abstract class SnapshotEntity<
   TEntity extends MainEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TSnapshotEntity extends SnapshotEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TLogEntity extends LogEntity<TEntity, TSnapshotEntity, TLogEntity>
> extends CoreEntity {
   abstract prevVersion: TSnapshotEntity;
   abstract mainEntity: TEntity;
   abstract logs: TLogEntity[];

   public abstract isDirty(oldVersion: TSnapshotEntity): boolean;

   public abstract copy(oldVersion: TSnapshotEntity): boolean;

   public setPreviousVersion(version: TSnapshotEntity) {
      this.prevVersion = version;
   }

   public setMainEntity(main: TEntity) {
      this.mainEntity = main;
   }

   public getMainEntity() {
      return this.mainEntity;
   }

   public getPrevVersion() {
      return this.prevVersion;
   }
}