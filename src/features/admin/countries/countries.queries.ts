import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllCountriesFilters {
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

export class GetAllCountriesQuery {
  constructor(public filters: GetAllCountriesFilters) {}
}

export class GetCountryByIdQuery {
  constructor(public id: number) {}
}
