import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representative } from '../../representative.entity';
import { UpdateRepresentativeCommand } from './update-representative.command';
import { RepresentativeResponse } from '../create-representative/representative.response';

@CommandHandler(UpdateRepresentativeCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativeCommand> {
  async execute(command: UpdateRepresentativeCommand): Promise<RepresentativeResponse> {
    const representative = await Representative.findOneBy({ id: command.id });
    if (!representative) {
      throw new NotFoundException('Representative not found');
    }

    representative.fullName = command.fullName ?? representative.fullName;
    representative.image = command.image ?? representative.image;
    representative.email = command.email ?? representative.email;
    representative.phoneNumber = command.phoneNumber ?? representative.phoneNumber;
    representative.resume = command.resume ?? representative.resume;

    await Representative.save(representative);
    return plainToInstance(RepresentativeResponse, representative, { excludeExtraneousValues: true });
  }
}
