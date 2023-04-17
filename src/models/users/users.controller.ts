import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { Mapper } from '@nartc/automapper';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserHistoricalDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrivateController } from '@common/controllers/private.controller';

@Controller('users')
export class UsersController extends PrivateController {
   constructor(private readonly userService: UserService) {
      super();
   }

   @Get()
   async findAll(): Promise<ListUserDto[]> {
      const users = await this.userService.findAll();
      const dto = await Mapper.mapArrayAsync(users, ListUserDto, User);

      return dto;
   }

   @Get(':id')
   async findById(@Param('id') id: string): Promise<UpdateUserHistoricalDto> {
      const user = await this.userService.findById(id);
      const dto = await Mapper.mapAsync(user, UpdateUserHistoricalDto, User);

      return dto;
   }

   @Post()
   async createUser(@Body() createUserDto: CreateUserDto): Promise<UpdateUserDto> {
      const user = await this.userService.createUser(createUserDto);
      const dto = await Mapper.mapAsync(user, UpdateUserDto, User);

      return dto;
   }

   @Put()
   async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UpdateUserHistoricalDto> {
      const user = await this.userService.updateUser(updateUserDto);
      const dto = await Mapper.mapAsync(user, UpdateUserHistoricalDto, User);

      return dto;
   }
}
