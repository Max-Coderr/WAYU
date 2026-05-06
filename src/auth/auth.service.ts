import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    // Find user by login
    const user = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify password using argon2
    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const payload = { id: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
