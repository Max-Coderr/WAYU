import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Representative } from '../../representative.entity';
import { DeleteRepresentativeCommand } from './delete-representative.command';

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
  async execute(command: DeleteRepresentativeCommand): Promise<void> {
    const deleted = await Representative.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Representative not found');
    }
  }
}
