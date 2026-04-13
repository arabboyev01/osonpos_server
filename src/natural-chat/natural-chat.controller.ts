import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NaturalChatService } from './natural-chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('natural-chat')
@UseGuards(JwtAuthGuard)
export class NaturalChatController {
  constructor(private readonly naturalChatService: NaturalChatService) {}

  @Post('session')
  async createSession(
    @Request() req,
    @Body()
    body: { chatType: 'CHAT' | 'GROUP'; employeeIds: string[]; name?: string },
  ) {
    // Include current employee in participants if not already there
    const employeeIds = [...new Set([...body.employeeIds, req.user.id])].filter(
      (id) => !!id,
    );
    return this.naturalChatService.createSession(
      req.user.dbName,
      body.chatType,
      employeeIds,
      body.name,
    );
  }

  @Get('sessions')
  async getSessions(@Request() req) {
    return this.naturalChatService.getSessions(req.user.dbName, req.user.id);
  }

  @Get('history/:session_id')
  async getHistory(@Request() req, @Param('session_id') sessionId: string) {
    return this.naturalChatService.getHistory(req.user.dbName, sessionId);
  }

  @Get('employees')
  async getEmployees(@Request() req) {
    return this.naturalChatService.getEmployees(req.user.dbName);
  }
}
