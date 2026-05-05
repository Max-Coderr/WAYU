import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representative } from '@/features/admin/representatives/representative.entity';
import { CreateRepresentativeCommand, UpdateRepresentativeCommand, DeleteRepresentativeCommand } from '@/features/admin/representatives/representatives.commands';
import { GetAllRepresentativesQuery } from '@/features/admin/representatives/representatives.queries';
import { RepresentativeResponse } from '@/features/admin/representatives/representatives.responses';

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

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
  async execute(command: DeleteRepresentativeCommand): Promise<void> {
    const deleted = await Representative.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Representative not found');
    }
  }
}

@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesQuery> {
  async execute(query: GetAllRepresentativesQuery): Promise<RepresentativeResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const representatives = await Representative.find({ skip, take });
    return plainToInstance(RepresentativeResponse, representatives, { excludeExtraneousValues: true });
  }
}
