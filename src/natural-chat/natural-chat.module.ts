import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NaturalChatGateway } from './natural-chat.gateway';
import { NaturalChatService } from './natural-chat.service';
import { NaturalChatController } from './natural-chat.controller';

@Module({
  imports: [AuthModule],
  providers: [NaturalChatService, NaturalChatGateway],
  controllers: [NaturalChatController],
  exports: [NaturalChatService],
})
export class NaturalChatModule {}
