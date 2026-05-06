import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Representative } from '../../representative.entity';
import { GetAllRepresentativesQuery } from './get-all-representatives.query';
import { RepresentativeResponse } from '../../commands/create-representative/representative.response';

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
