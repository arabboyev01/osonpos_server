import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { QueryService } from '../services/query.service';
import { RawQueryDto } from '../dto/query.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('get')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  execute(@Request() req, @Body() dto: RawQueryDto) {
    return this.queryService.executeQuery(req.user.dbName, dto.query);
  }
}
