import { Command } from '@nestjs/cqrs';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSocialLinkCommand extends Command<any> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  icon!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  link!: string;
}

export class UpdateSocialLinkCommand extends Command<any> {
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  id!: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiPropertyOptional()
  icon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @ApiPropertyOptional()
  link?: string;
}

export class DeleteSocialLinkCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
