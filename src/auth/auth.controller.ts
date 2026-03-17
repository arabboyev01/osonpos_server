import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PosLoginDto } from './dto/pos-auth.dto';
import {
  EnableSecondVerificationDto,
  UpdateSecondVerificationPasswordDto,
  VerifySecondVerificationDto,
} from './dto/second-verification.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto.login, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/info')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.removeUser(id);
  }

  // POS Authentication Endpoints
  @UseGuards(JwtAuthGuard)
  @Get('pos/workplaces')
  async getPosWorkplaces(@Request() req) {
    return this.authService.getPosWorkplaces(req.user.dbName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pos/login')
  async posLogin(@Request() req, @Body() dto: PosLoginDto) {
    return this.authService.employeeLogin(
      req.user.dbName,
      req.user.businessId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/second-verification/enable')
  async enableSecondVerification(
    @Request() req,
    @Body() dto: EnableSecondVerificationDto,
  ) {
    return this.authService.enableSecondVerification(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/second-verification/disable')
  async disableSecondVerification(@Request() req) {
    return this.authService.disableSecondVerification(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/second-verification/update-password')
  async updateSecondVerificationPassword(
    @Request() req,
    @Body() dto: UpdateSecondVerificationPasswordDto,
  ) {
    return this.authService.updateSecondVerificationPassword(req.user.id, dto);
  }

  @Post('second-verification/verify')
  async verifySecondVerification(@Body() dto: VerifySecondVerificationDto) {
    return this.authService.verifySecondVerificationPassword(dto);
  }
}
