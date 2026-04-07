import { Controller, Post, Body, Get, Param, Res, HttpStatus, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import * as express from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai-chat')
@UseGuards(JwtAuthGuard)
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post('session')
  async createSession(@Request() req, @Body() body: { name: string }) {
    return this.aiChatService.createSession(req.user.dbName, body.name);
  }

  @Get('sessions')
  async getSessions(@Request() req) {
    return this.aiChatService.getSessions(req.user.dbName);
  }

  @Get('history/:session_id')
  async getHistory(@Request() req, @Param('session_id') sessionId: string) {
    return this.aiChatService.getHistory(req.user.dbName, sessionId);
  }

  @Patch('session/:id')
  async updateSession(@Request() req, @Param('id') id: string, @Body() body: { name: string }) {
    return this.aiChatService.updateSession(req.user.dbName, id, body.name);
  }

  @Delete('session/:id')
  async deleteSession(@Request() req, @Param('id') id: string) {
    return this.aiChatService.deleteSession(req.user.dbName, id);
  }

  @Patch('history/:id')
  async updateHistory(@Request() req, @Param('id') id: string, @Body() body: { message: string }) {
    return this.aiChatService.updateHistory(req.user.dbName, id, body.message);
  }

  @Delete('history/:id')
  async deleteHistory(@Request() req, @Param('id') id: string) {
    return this.aiChatService.deleteHistory(req.user.dbName, id);
  }

  @Post('message')
  async sendMessage(
    @Request() req,
    @Body() body: { session_id: string; message: string },
    @Res() res: express.Response,
  ) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      const stream = this.aiChatService.generateStreamResponse(
        req.user.dbName,
        body.session_id,
        body.message,
      );

      for await (const chunk of stream) {
        res.write(chunk);
      }
      res.end();
    } catch (error) {
      console.error('Chat error:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
