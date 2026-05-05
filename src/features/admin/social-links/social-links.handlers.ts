import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { SocialLink } from '@/features/admin/social-links/social-link.entity';
import { CreateSocialLinkCommand, UpdateSocialLinkCommand, DeleteSocialLinkCommand } from '@/features/admin/social-links/social-links.commands';
import { GetAllSocialLinksQuery } from '@/features/admin/social-links/social-links.queries';
import { SocialLinkResponse } from '@/features/admin/social-links/social-links.responses';

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

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler implements ICommandHandler<DeleteSocialLinkCommand> {
  async execute(command: DeleteSocialLinkCommand): Promise<void> {
    const deleted = await SocialLink.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Social link not found');
    }
  }
}

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
  async execute(query: GetAllSocialLinksQuery): Promise<SocialLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const socialLinks = await SocialLink.find({ skip, take });
    return plainToInstance(SocialLinkResponse, socialLinks, { excludeExtraneousValues: true });
  }
}
