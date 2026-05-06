import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsefulLinksController } from './useful-links.controller';
import { CreateUsefulLinkHandler } from './commands/create-useful-link/create-useful-link.handler';
import { UpdateUsefulLinkHandler } from './commands/update-useful-link/update-useful-link.handler';
import { DeleteUsefulLinkHandler } from './commands/delete-useful-link/delete-useful-link.handler';
import { GetAllUsefulLinksHandler } from './queries/get-all-useful-links/get-all-useful-links.handler';

@Module({
  imports: [CqrsModule],
  controllers: [UsefulLinksController],
  providers: [
    CreateUsefulLinkHandler,
    UpdateUsefulLinkHandler,
    DeleteUsefulLinkHandler,
    GetAllUsefulLinksHandler,
  ],
})
export class UsefulLinksModule {}
