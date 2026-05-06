import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UsefulLink } from '../../useful-link.entity';
import { UpdateUsefulLinkCommand } from './update-useful-link.command';
import { UsefulLinkResponse } from '../create-useful-link/useful-link.response';

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
