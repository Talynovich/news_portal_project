import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }

  @Get('')
  findAll() {
    return this.authService.findAll();
  }
}
