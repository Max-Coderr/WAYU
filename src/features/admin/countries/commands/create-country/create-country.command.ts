import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export interface ICreateCountryCommand {
  title: string;
  flag: string;
}

export class CreateCountryCommand implements ICreateCountryCommand {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  flag!: string;
}
