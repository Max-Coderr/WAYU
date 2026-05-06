import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsefulLinkCommand {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
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
