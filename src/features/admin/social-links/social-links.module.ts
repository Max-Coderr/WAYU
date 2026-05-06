import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SocialLinksController } from './social-links.controller';
import { CreateSocialLinkHandler } from './commands/create-social-link/create-social-link.handler';
import { UpdateSocialLinkHandler } from './commands/update-social-link/update-social-link.handler';
import { DeleteSocialLinkHandler } from './commands/delete-social-link/delete-social-link.handler';
import { GetAllSocialLinksHandler } from './queries/get-all-social-links/get-all-social-links.handler';

@Module({
  imports: [CqrsModule],
  controllers: [SocialLinksController],
  providers: [
    CreateSocialLinkHandler,
    UpdateSocialLinkHandler,
    DeleteSocialLinkHandler,
    GetAllSocialLinksHandler,
  ],
})
export class SocialLinksModule {}
