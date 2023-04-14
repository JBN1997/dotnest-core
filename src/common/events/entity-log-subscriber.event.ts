import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { List } from 'linqts';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { MainEntity } from '@common/entities/snapshot/main.entity';
import { SnapshotEntity } from '@common/entities/snapshot/snapshot.entity';
import { LogEntity } from '@common/entities/snapshot/log.entity';
import { LogAction } from '@common/enums/log-action.enum';

export abstract class EntityLogSubscriber<
   TEntity extends MainEntity<TEntity, TVersioned, TLogEntity>,
   TVersioned extends SnapshotEntity<TEntity, TVersioned, TLogEntity>,
   TLogEntity extends LogEntity<TEntity, TVersioned, TLogEntity>,
> implements EntitySubscriberInterface<TVersioned>
{
   async afterInsert(event: InsertEvent<TVersioned>): Promise<void> {
      const { entity, metadata, manager } = event;
      const { prevVersion } = entity;

      const columns = new List<ColumnMetadata>(metadata.nonVirtualColumns);

      const logs = columns
         .Select((column) => ({
            newValue: column.getEntityValue(entity),
            oldValue: column.getEntityValue(prevVersion),
            ...column,
         }))
         .Where((column) => column.newValue !== column.oldValue)
         .Select((column) => {
            const log = this.createLog();
            log.setAction(LogAction.Create);
            log.setColumnName(column.propertyName);
            log.setOldValue((column.oldValue || '(empty)').toString());
            log.setNewValue((column.newValue || '(empty)').toString());
            log.setVersion(entity);
            return log;
         })
         .ToArray();

      await manager.save(logs);
   }

   abstract createLog(): TLogEntity;
}
