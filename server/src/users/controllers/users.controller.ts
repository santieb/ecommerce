import {
  Body,
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
import { LoginUserDto } from '../dto/loginUser.dto';
import { JwtAuthGuard } from '../jwt.auth.guard';

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

  @Post('login')
  async loginUser(@Body() user: LoginUserDto) {
    return this.usersService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allUsers() {
    return this.usersService.allUsers();
  }
}
