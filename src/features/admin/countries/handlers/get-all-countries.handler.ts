import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Country } from '../country.entity';
import { GetAllCountriesQuery } from '../queries/get-countries.queries';
import { CountryResponse } from '../responses/country.response';

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesQuery> {
  async execute(query: GetAllCountriesQuery): Promise<CountryResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const countries = await Country.find({ skip, take });
    return plainToInstance(CountryResponse, countries, { excludeExtraneousValues: true });
  }
}
