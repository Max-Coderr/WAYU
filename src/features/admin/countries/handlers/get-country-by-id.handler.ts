import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Country } from '../country.entity';
import { GetCountryByIdQuery } from '../queries/get-countries.queries';
import { CountryResponse } from '../responses/country.response';

@QueryHandler(GetCountryByIdQuery)
export class GetCountryByIdHandler implements IQueryHandler<GetCountryByIdQuery> {
  async execute(query: GetCountryByIdQuery): Promise<CountryResponse> {
    const country = await Country.findOneBy({ id: query.id });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return plainToInstance(CountryResponse, country, { excludeExtraneousValues: true });
  }
}
