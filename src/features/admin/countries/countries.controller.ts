import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCountryCommand } from './commands/create-country/create-country.command';
import { DeleteCountryCommand } from './commands/delete-country/delete-country.command';
import { GetAllCountriesFilters, GetAllCountriesQuery } from './queries/get-all-countries/get-all-countries.query';
import { GetCountryByIdQuery } from './queries/get-country-by-id/get-country-by-id.query';
import { CountryResponse } from './commands/create-country/country.response';

@Controller('admin/countries')
export class CountriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [CountryResponse] })
  async getAllCountries(@Query() filters: GetAllCountriesFilters) {
    return await this.queryBus.execute(new GetAllCountriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: CountryResponse })
  async getCountry(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetCountryByIdQuery(id));
  }

  @Post()
  @ApiCreatedResponse({ type: CountryResponse })
  async createCountry(@Body() command: CreateCountryCommand) {
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteCountryCommand(id));
  }
}
