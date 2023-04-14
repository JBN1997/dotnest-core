import { CoreEntity } from '@common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class WebsocketClientEntity extends CoreEntity {
   @Column({ unique: true })
   clientID: string;
}
