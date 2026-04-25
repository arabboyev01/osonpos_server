import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sync')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN', 'EMPLOYEE')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('pull')
  async pull(@Request() req, @Body() body: { lastSyncTime: string }) {
    return this.syncService.pullChanges(req.user.dbName, body.lastSyncTime);
  }

  @Post('push')
  async push(@Request() req, @Body() body: { updates: Record<string, any[]> }) {
    return this.syncService.pushChanges(req.user.dbName, body.updates);
  }
}
