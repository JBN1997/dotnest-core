import { EventSubscriber } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityLogSubscriber } from '@common/events/entity-log-subscriber.event';
import { UserLog } from '@models/entities/user-log.entity';
import { UserSnapshot } from '@models/entities/user-snapshot.entity';
import { User } from '@models/entities/user.entity';

@Injectable()
@EventSubscriber()
export class UserLogSubscriber extends EntityLogSubscriber<User, UserSnapshot, UserLog> {
   listenTo() {
      return UserSnapshot;
   }

   createLog(): UserLog {
      return new UserLog();
   }
}
