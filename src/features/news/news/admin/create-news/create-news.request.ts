import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsInt, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNewsRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;
}
