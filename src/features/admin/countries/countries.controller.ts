import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCountryCommand } from './commands/create-country.command';
import { DeleteCountryCommand } from './commands/delete-country.command';
import { GetAllCountriesFilters, GetAllCountriesQuery, GetCountryByIdQuery } from './queries/get-countries.queries';
import { CountryResponse } from './responses/country.response';

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
