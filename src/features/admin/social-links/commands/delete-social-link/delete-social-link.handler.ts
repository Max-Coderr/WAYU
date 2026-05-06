import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SocialLink } from '../../social-link.entity';
import { DeleteSocialLinkCommand } from './delete-social-link.command';

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler implements ICommandHandler<DeleteSocialLinkCommand> {
  async execute(command: DeleteSocialLinkCommand): Promise<void> {
    const deleted = await SocialLink.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Social link not found');
    }
  }
}
