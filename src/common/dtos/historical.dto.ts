import { Dto } from '@common/dtos/base.dto';

export interface HistoricDto {
   events: HistoricEventDto[];
}

export interface HistoricEventDto {
   propertyName: string;
   action: string;
   oldValue: string;
   newValue: string;
   timestamp: Date;
}

export class HistoricalDto extends Dto {
   changeHistory: HistoricDto[];
}
