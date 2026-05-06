import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSocialLinkCommand {
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
