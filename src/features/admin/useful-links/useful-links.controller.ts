import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUsefulLinkCommand } from './commands/create-useful-link/create-useful-link.command';
import { UpdateUsefulLinkCommand } from './commands/update-useful-link/update-useful-link.command';
import { DeleteUsefulLinkCommand } from './commands/delete-useful-link/delete-useful-link.command';
import { GetAllUsefulLinksFilters, GetAllUsefulLinksQuery } from './queries/get-all-useful-links/get-all-useful-links.query';
import { UsefulLinkResponse } from './commands/create-useful-link/useful-link.response';

@Controller('admin/useful-links')
export class UsefulLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [UsefulLinkResponse] })
  async getAll(@Query() filters: GetAllUsefulLinksFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinksQuery(filters));
  }

  @Post()
  @ApiCreatedResponse({ type: UsefulLinkResponse })
  async create(@Body() command: CreateUsefulLinkCommand) {
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiOkResponse({ type: UsefulLinkResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateUsefulLinkCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteUsefulLinkCommand(id));
  }
}
