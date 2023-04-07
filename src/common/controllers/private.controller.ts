import { UseGuards } from '@nestjs/common';
import { Roles } from '@authentication/decorators/role.decorator';
import { JwtAuthGuard } from '@authentication/guards/jwt.guard';
import { RolesGuard } from '@authentication/guards/role.guard';
import { UserRole } from '@models/enums/role.enum';

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Roles(UserRole.Admin)
export abstract class PrivateController {}
