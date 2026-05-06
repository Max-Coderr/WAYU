import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CountriesController } from './countries.controller';
import { CreateCountryHandler } from './commands/create-country/create-country.handler';
import { DeleteCountryHandler } from './commands/delete-country/delete-country.handler';
import { GetAllCountriesHandler } from './queries/get-all-countries/get-all-countries.handler';
import { GetCountryByIdHandler } from './queries/get-country-by-id/get-country-by-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CountriesController],
  providers: [
    CreateCountryHandler,
    DeleteCountryHandler,
    GetAllCountriesHandler,
    GetCountryByIdHandler,
  ],
})
export class CountriesModule {}
