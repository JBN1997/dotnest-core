import { Module } from '@nestjs/common';
import { CreateUserJob } from '@jobs/recurring/create-first-user.job';
import { UsersModule } from '@models/users.module';

@Module({
   imports: [UsersModule],
   providers: [CreateUserJob],
})
export class JobsModule {}
