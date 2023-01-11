import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
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

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      name: user.name,
      id: user.id,
      isAdmin: user.isAdmin,
    };

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const userFound = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!userFound) return null;

    const isMatch = await bcrypt.compare(pass, userFound.password);
    if (!userFound || !isMatch) return null;

    const { password, ...result } = userFound;
    return result;
  }

  async allUsers(): Promise<object | HttpException> {
    return this.userRepository.find();
  }
}
