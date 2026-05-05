import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRepresentativeCommand, DeleteRepresentativeCommand, UpdateRepresentativeCommand } from '@/features/admin/representatives/representatives.commands';
import { GetAllRepresentativesFilters, GetAllRepresentativesQuery } from '@/features/admin/representatives/representatives.queries';
import { RepresentativeResponse } from '@/features/admin/representatives/representatives.responses';

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
