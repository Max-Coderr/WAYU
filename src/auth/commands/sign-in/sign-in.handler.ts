import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { BadRequestException } from '@nestjs/common';
import { SignInCommand } from './sign-in.command';
import { SignInResponse } from './sign-in.response';
import { User } from '../../user.entity';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, SignInResponse> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async execute(command: SignInCommand): Promise<SignInResponse> {
    const { login, password } = command;

    const user = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
