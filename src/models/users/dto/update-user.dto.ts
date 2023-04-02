import { Dto } from '@common/dtos/base.dto';
import { HistoricalDto } from '@common/dtos/historical.dto';

export class UpdateUserDto extends Dto {
   name: string;
   email: string;
   password: string;
}

export class UpdateUserHistoricalDto extends HistoricalDto {
   name: string;
   email: string;
   password: string;
}
