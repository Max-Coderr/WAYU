import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { SocialLink } from '../../social-link.entity';
import { UpdateSocialLinkCommand } from './update-social-link.command';
import { SocialLinkResponse } from '../create-social-link/social-link.response';

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler implements ICommandHandler<UpdateSocialLinkCommand> {
  async execute(command: UpdateSocialLinkCommand): Promise<SocialLinkResponse> {
    const socialLink = await SocialLink.findOneBy({ id: command.id });
    if (!socialLink) {
      throw new NotFoundException('Social link not found');
    }

    socialLink.title = command.title ?? socialLink.title;
    socialLink.icon = command.icon ?? socialLink.icon;
    socialLink.link = command.link ?? socialLink.link;

    await SocialLink.save(socialLink);
    return plainToInstance(SocialLinkResponse, socialLink, { excludeExtraneousValues: true });
  }
}
