import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from '../login.dto';
import { SignInCommand } from '../commands/sign-in/sign-in.command';
import { SignInResponse } from '../commands/sign-in/sign-in.response';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('sign-in')
  async signIn(@Body() loginDto: LoginDto): Promise<SignInResponse> {
    return this.commandBus.execute(new SignInCommand(loginDto.login, loginDto.password));
  }
}
