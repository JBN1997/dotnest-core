import { List } from 'linqts';

import { HistoricDto, HistoricEventDto } from '@common/dtos/historical.dto';
import { LogEntity } from '@common/entities/snapshot/log.entity';
import { MainEntity } from '@common/entities/snapshot/main.entity';
import { SnapshotEntity } from '@common/entities/snapshot/snapshot.entity';

export class HistoricalAssembler {
   static toDto<
      TEntity extends MainEntity<TEntity, TSnapshotEntity, TLogEntity>,
      TSnapshotEntity extends SnapshotEntity<TEntity, TSnapshotEntity, TLogEntity>,
      TLogEntity extends LogEntity<TEntity, TSnapshotEntity, TLogEntity>,
   >(entity: TEntity) {
      const changeHistory: HistoricDto[] = [];
      const events = new List<TLogEntity>(entity.logs).GroupBy<HistoricEventDto>(
         (entity) => entity.version.id,
         (entity) => ({
            action: entity.action,
            newValue: entity.newValue,
            oldValue: entity.oldValue,
            propertyName: entity.columnName,
            timestamp: entity.createdAt,
         }),
      );

      for (const key in events) {
         const history: HistoricDto = {
            events: events[key],
         };

         changeHistory.push(history);
      }

      return changeHistory;
   }
}
