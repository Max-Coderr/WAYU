import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Country } from '../../country.entity';
import { DeleteCountryCommand } from './delete-country.command';

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
  async execute(command: DeleteCountryCommand): Promise<void> {
    const deleted = await Country.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Country not found');
    }
  }
}
