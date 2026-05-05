import { Command } from '@nestjs/cqrs';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRepresentativeCommand extends Command<any> {
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

export class UpdateRepresentativeCommand extends Command<any> {
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  id!: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiPropertyOptional()
  fullName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiPropertyOptional()
  image?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 16)
  @ApiPropertyOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  resume?: string;
}

export class DeleteRepresentativeCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
