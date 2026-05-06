import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { SocialLink } from '../../social-link.entity';
import { CreateSocialLinkCommand } from './create-social-link.command';
import { SocialLinkResponse } from './social-link.response';

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler implements ICommandHandler<CreateSocialLinkCommand> {
  async execute(command: CreateSocialLinkCommand): Promise<SocialLinkResponse> {
    const exists = await SocialLink.existsBy({ title: ILike(command.title) });
    if (exists) {
      throw new BadRequestException('Social link title is already taken');
    }

    const socialLink = SocialLink.create({ title: command.title, icon: command.icon, link: command.link } as SocialLink);
    await SocialLink.save(socialLink);
    return plainToInstance(SocialLinkResponse, socialLink, { excludeExtraneousValues: true });
  }
}
