import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginUserDto } from '../dto/loginUser.dto';
import { UsersEntity } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userFound)
      return new HttpException('User already exists', HttpStatus.CONFLICT);

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async loginUser(user: LoginUserDto): Promise<object | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: { email: user.email },
    });
    const isMatch = await bcrypt.compare(user.password, userFound.password);
    if (!userFound || !isMatch)
      throw new HttpException('Incorrect credentials', HttpStatus.NOT_FOUND);

    userFound.password = null;
    const payload = {
      name: userFound.name,
      id: userFound.id,
      isAdmin: userFound.isAdmin,
    };
    return { userFound, token: this.jwtService.sign(payload) };
  }
}
