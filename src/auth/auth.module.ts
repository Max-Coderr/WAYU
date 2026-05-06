import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { User } from './user.entity';
import { SignInHandler } from './commands/sign-in/sign-in.handler';

const CommandHandlers = [SignInHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
