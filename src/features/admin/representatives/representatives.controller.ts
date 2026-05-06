import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRepresentativeCommand } from './commands/create-representative/create-representative.command';
import { UpdateRepresentativeCommand } from './commands/update-representative/update-representative.command';
import { DeleteRepresentativeCommand } from './commands/delete-representative/delete-representative.command';
import { GetAllRepresentativesFilters, GetAllRepresentativesQuery } from './queries/get-all-representatives/get-all-representatives.query';
import { RepresentativeResponse } from './commands/create-representative/representative.response';

@Controller('admin/representatives')
export class RepresentativesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [RepresentativeResponse] })
  async getAll(@Query() filters: GetAllRepresentativesFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesQuery(filters));
  }

  @Post()
  @ApiCreatedResponse({ type: RepresentativeResponse })
  async create(@Body() command: CreateRepresentativeCommand) {
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiOkResponse({ type: RepresentativeResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateRepresentativeCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteRepresentativeCommand(id));
  }
}
