import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface ICountryResponse {
  id: number;
  title: string;
  flag: string;
}

export class CountryResponse implements ICountryResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  flag!: string;
}
