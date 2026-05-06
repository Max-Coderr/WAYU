import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateRepresentativeCommand {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  image!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 16)
  @ApiProperty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  resume!: string;
}
