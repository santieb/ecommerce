import {
  Body,
  Request,
  Controller,
  HttpException,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/users.entity';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { LocalAuthGuard } from '../helpers/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() newUser: CreateUserDto,
  ): Promise<UsersEntity | HttpException> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltOrRounds);
    newUser.password = hash;
    return this.usersService.createUser(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    return this.usersService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allUsers() {
    return this.usersService.allUsers();
  }
}
