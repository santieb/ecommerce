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
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { RolesGuard } from '../helpers/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() newUser: CreateUserDto,
  ): Promise<any | HttpException> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltOrRounds);
    newUser.password = hash;
    return this.usersService.createUser(newUser);
  }

  @Post('login')
  async loginUser(@Body() Body) {
    const { email, password } = Body;
    return this.usersService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  allUsers() {
    return this.usersService.allUsers();
  }
}
