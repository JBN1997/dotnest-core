import { ApiProperty } from '@nestjs/swagger';

export class Dto {
   @ApiProperty({
      description: 'The unique identifier of the register',
      example: '0038e81f-feb7-44da-bcee-dfe917f4bd53',
   })
   id: string;
}
