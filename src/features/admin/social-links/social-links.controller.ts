import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSocialLinkCommand } from './commands/create-social-link/create-social-link.command';
import { UpdateSocialLinkCommand } from './commands/update-social-link/update-social-link.command';
import { DeleteSocialLinkCommand } from './commands/delete-social-link/delete-social-link.command';
import { GetAllSocialLinksFilters, GetAllSocialLinksQuery } from './queries/get-all-social-links/get-all-social-links.query';
import { SocialLinkResponse } from './commands/create-social-link/social-link.response';

@Controller('admin/social-links')
export class SocialLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [SocialLinkResponse] })
  async getAll(@Query() filters: GetAllSocialLinksFilters) {
    return await this.queryBus.execute(new GetAllSocialLinksQuery(filters));
  }

  @Post()
  @ApiCreatedResponse({ type: SocialLinkResponse })
  async create(@Body() command: CreateSocialLinkCommand) {
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiOkResponse({ type: SocialLinkResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateSocialLinkCommand) {
    command.id = id;
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteSocialLinkCommand(id));
  }
}
