import { JwtAuthGuard } from '@authentication/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
export abstract class ProtectedController {}
