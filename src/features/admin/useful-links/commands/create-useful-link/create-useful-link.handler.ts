import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { UsefulLink } from '../../useful-link.entity';
import { CreateUsefulLinkCommand } from './create-useful-link.command';
import { UsefulLinkResponse } from './useful-link.response';

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
