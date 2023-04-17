import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@authentication/guards/jwt.guard';
import { RolesGuard } from '@authentication/guards/role.guard';

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export abstract class ProtectedController {}
