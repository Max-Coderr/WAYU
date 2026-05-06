import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representative } from '../../representative.entity';
import { CreateRepresentativeCommand } from './create-representative.command';
import { RepresentativeResponse } from './representative.response';

@CommandHandler(CreateRepresentativeCommand)
export class CreateRepresentativeHandler implements ICommandHandler<CreateRepresentativeCommand> {
  async execute(command: CreateRepresentativeCommand): Promise<RepresentativeResponse> {
    const representative = Representative.create({
      fullName: command.fullName,
      image: command.image,
      email: command.email,
      phoneNumber: command.phoneNumber,
      resume: command.resume,
    } as Representative);

    await Representative.save(representative);
    return plainToInstance(RepresentativeResponse, representative, { excludeExtraneousValues: true });
  }
}
