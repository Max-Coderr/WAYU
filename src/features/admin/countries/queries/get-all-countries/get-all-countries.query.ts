import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export interface IGetAllCountriesFilters {
  page?: number;
  size?: number;
}

export class GetAllCountriesFilters implements IGetAllCountriesFilters {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 1 })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 10 })
  size?: number;
}

export interface IGetAllCountriesQuery {
  filters: IGetAllCountriesFilters;
}

export class GetAllCountriesQuery implements IGetAllCountriesQuery {
  constructor(public filters: GetAllCountriesFilters) {}
}
