import { CoreEntity } from '@common/entities/base.entity';
import { LogEntity } from '@common/entities/snapshot/log.entity';
import { SnapshotEntity } from '@common/entities/snapshot/snapshot.entity';

export abstract class MainEntity<
   TEntity extends MainEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TSnapshotEntity extends SnapshotEntity<TEntity, TSnapshotEntity, TLogEntity>,
   TLogEntity extends LogEntity<TEntity, TSnapshotEntity, TLogEntity>,
> extends CoreEntity {
   abstract lastVersion: TSnapshotEntity;
   abstract versions: TSnapshotEntity[];
   abstract logs: TLogEntity[];

   public requestChange(
      ctor: new () => TSnapshotEntity,
      fn: (version: TSnapshotEntity) => void,
   ): TSnapshotEntity {
      const version = new ctor();
      const lastVersion = this.getLastVersion();

      version.copy(lastVersion);
      fn(version);

      if (!lastVersion || version.isDirty(this.lastVersion)) {
         version.setPreviousVersion(this.getLastVersion());
         version.setMainEntity(this as any as TEntity);
         this.setLastVersion(version);
      }

      return this.lastVersion;
   }

   public setLastVersion(version: TSnapshotEntity): void {
      this.lastVersion = version;
   }

   public getLastVersion(): TSnapshotEntity {
      return this.lastVersion;
   }

   public getVersions(): TSnapshotEntity[] {
      return this.versions;
   }
}
