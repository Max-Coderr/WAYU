import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsefulLink } from '../../useful-link.entity';
import { DeleteUsefulLinkCommand } from './delete-useful-link.command';

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
  async execute(command: DeleteUsefulLinkCommand): Promise<void> {
    const deleted = await UsefulLink.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Useful link not found');
    }
  }
}
