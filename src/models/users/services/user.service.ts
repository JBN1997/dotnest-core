import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityNotFoundError } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordService } from 'src/authentication/services/password.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@models/entities/user.entity';
import { UserSnapshot } from '@models/entities/user-snapshot.entity';
import { UserRole } from '@models/enums/role.enum';
import { UserStatus } from '@models/enums/status.enum';
import { UserSnapshotRepository } from '@models/repositories/user-snapshot.repository';
import { UpdateUserDto } from '@models/dto/update-user.dto';

@Injectable()
export class UserService {
   constructor(
      protected readonly userRepository: UserRepository,
      protected readonly userSnapshotRepository: UserSnapshotRepository,
      protected readonly passwordService: PasswordService,
   ) {
      userRepository.establishAllRelationships();
      userSnapshotRepository.establishAllRelationships();
   }

   async count(): Promise<number> {
      return await this.userRepository.countAsync();
   }

   async findAll(): Promise<User[]> {
      return await this.userRepository.getAllAsync();
   }

   async findByUsername(username: string): Promise<User> {
      return await this.userRepository.getByAsync({ username });
   }

   async createUser(dto: DeepPartial<CreateUserDto>): Promise<User> {
      const user = this.userRepository.create();

      const hashedPass = await this.passwordService.hashPassword(dto.password);
      user.setPassword(hashedPass);
      user.setUsername(dto.username);

      await this.userRepository.createEntityAsync(user);

      const userVersioned = user.requestChange(UserSnapshot, (version) => {
         version.name = dto.name;
         version.email = dto.email;
         version.role = dto.role as UserRole;
      });

      this.userRepository.transaction(async () => {
         await this.userRepository.saveAsync(user);
         await this.userSnapshotRepository.saveAsync(userVersioned);
      });

      return user;
   }

   async updateUser(dto: DeepPartial<UpdateUserDto>): Promise<User> {
      const user = await this.userRepository.getAsync(dto.id);

      if (!user) throw new EntityNotFoundError(User, {});

      const userVersioned = user.requestChange(UserSnapshot, (version) => {
         version.name = dto.name;
         version.email = dto.email;
         version.status = UserStatus.Active;
      });

      this.userRepository.transaction(async () => {
         await this.userRepository.saveAsync(user);
         await this.userSnapshotRepository.saveAsync(userVersioned);
      });

      return user;
   }
}
