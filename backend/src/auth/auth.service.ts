import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import { RequestWithUser } from './interfaces/request-with-user.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserForAuth(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
        {
          expiresIn: '15m',
        },
      ),
      refresh_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
        {
          expiresIn: '3d',
        },
      ),
      username: user.username,
    };
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload: RequestWithUser = await this.jwtService.verifyAsync(
        refreshDto.refresh_token,
      );
      const user = await this.userService.findUserForAuth(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return {
        access_token: await this.jwtService.signAsync(
          {
            sub: user.id,
            username: user.username,
            role: user.role,
          },
          {
            expiresIn: '15m',
          },
        ),
        refresh_token: await this.jwtService.signAsync(
          {
            sub: user.id,
            username: user.username,
            role: user.role,
          },
          {
            expiresIn: '3d',
          },
        ),
        username: user.username,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }
}
