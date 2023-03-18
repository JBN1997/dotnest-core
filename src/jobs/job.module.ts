import { UsersModule } from '@models/users/users.module';
import { Module } from '@nestjs/common';
import { CreateUserJob } from '@jobs/recurring/create-first-user.job';

@Module({
   imports: [UsersModule],
   providers: [CreateUserJob],
})
export class JobsModule {}
