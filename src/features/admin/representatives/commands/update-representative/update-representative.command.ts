import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRepresentativeCommand {
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
