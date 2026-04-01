import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InventarizationService } from '../services/inventarization.service';
import {
  CreateStockListDto,
  UpdateStockListDto,
} from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('stock-quantity')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class StockQuantityController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateStockListDto) {
    return this.service.createStockList(req.user.dbName, req.user.id, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllStockLists(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneStockList(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateStockListDto,
  ) {
    return this.service.updateStockList(req.user.dbName, req.user.id, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeStockList(req.user.dbName, id);
  }
}
