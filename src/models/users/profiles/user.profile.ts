import { mapFrom, Mapper, ProfileBase } from '@nartc/automapper';

import { User } from '@models/entities/user.entity';
import { HistoricalAssembler } from '@common/assemblies/historical.assembly';
import { UpdateUserDto, UpdateUserHistoricalDto } from '@models/dto/update-user.dto';
import { ListUserDto } from '@models/dto/list-user.dto';

export class UserProfile extends ProfileBase {
   constructor() {
      super();

      Mapper.createMap(User, ListUserDto)
         .forMember(
            (dest) => dest.id,
            mapFrom((src) => src.id),
         )
         .forMember(
            (dest) => dest.name,
            mapFrom((src) => src.getLastVersion()?.name),
         )
         .forMember(
            (dest) => dest.role,
            mapFrom((src) => src.getLastVersion()?.role),
         )
         .forMember(
            (dest) => dest.status,
            mapFrom((src) => src.getLastVersion()?.status),
         );

      Mapper.createMap(User, UpdateUserHistoricalDto)
         .forMember(
            (dest) => dest.id,
            mapFrom((src) => src.id),
         )
         .forMember(
            (dest) => dest.email,
            mapFrom((src) => src.getLastVersion()?.email),
         )
         .forMember(
            (dest) => dest.name,
            mapFrom((src) => src.getLastVersion()?.name),
         )
         .forMember(
            (dest) => dest.changeHistory,
            mapFrom((src) => HistoricalAssembler.toDto(src)),
         );
   }
}
