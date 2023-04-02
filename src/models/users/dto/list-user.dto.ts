import { Dto } from '@common/dtos/base.dto';

export class ListUserDto extends Dto {
   name: string;
   status: string;
   role: string;
}
