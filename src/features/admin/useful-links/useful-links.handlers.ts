import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { UsefulLink } from '@/features/admin/useful-links/useful-link.entity';
import { CreateUsefulLinkCommand, UpdateUsefulLinkCommand, DeleteUsefulLinkCommand } from '@/features/admin/useful-links/useful-links.commands';
import { GetAllUsefulLinksQuery } from '@/features/admin/useful-links/useful-links.queries';
import { UsefulLinkResponse } from '@/features/admin/useful-links/useful-links.responses';

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
  async execute(command: CreateUsefulLinkCommand): Promise<UsefulLinkResponse> {
    const exists = await UsefulLink.existsBy({ title: ILike(command.title) });
    if (exists) {
      throw new BadRequestException('Useful link title is already taken');
    }

    const usefulLink = UsefulLink.create({ title: command.title, icon: command.icon, link: command.link } as UsefulLink);
    await UsefulLink.save(usefulLink);
    return plainToInstance(UsefulLinkResponse, usefulLink, { excludeExtraneousValues: true });
  }
}

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
  async execute(command: UpdateUsefulLinkCommand): Promise<UsefulLinkResponse> {
    const usefulLink = await UsefulLink.findOneBy({ id: command.id });
    if (!usefulLink) {
      throw new NotFoundException('Useful link not found');
    }

    usefulLink.title = command.title ?? usefulLink.title;
    usefulLink.icon = command.icon ?? usefulLink.icon;
    usefulLink.link = command.link ?? usefulLink.link;

    await UsefulLink.save(usefulLink);
    return plainToInstance(UsefulLinkResponse, usefulLink, { excludeExtraneousValues: true });
  }
}

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
  async execute(command: DeleteUsefulLinkCommand): Promise<void> {
    const deleted = await UsefulLink.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Useful link not found');
    }
  }
}

@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
  async execute(query: GetAllUsefulLinksQuery): Promise<UsefulLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const usefulLinks = await UsefulLink.find({ skip, take });
    return plainToInstance(UsefulLinkResponse, usefulLinks, { excludeExtraneousValues: true });
  }
}
