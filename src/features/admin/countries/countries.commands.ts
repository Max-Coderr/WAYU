import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCountryCommand extends Command<any> {
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

export class DeleteCountryCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
