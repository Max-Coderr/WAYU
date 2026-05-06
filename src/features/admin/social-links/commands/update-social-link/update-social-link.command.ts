import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSocialLinkCommand {
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
