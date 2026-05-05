import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUsefulLinkCommand, DeleteUsefulLinkCommand, UpdateUsefulLinkCommand } from '@/features/admin/useful-links/useful-links.commands';
import { GetAllUsefulLinksFilters, GetAllUsefulLinksQuery } from '@/features/admin/useful-links/useful-links.queries';
import { UsefulLinkResponse } from '@/features/admin/useful-links/useful-links.responses';

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
