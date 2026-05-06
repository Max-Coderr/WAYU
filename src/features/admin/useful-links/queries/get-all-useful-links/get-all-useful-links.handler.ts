import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UsefulLink } from '../../useful-link.entity';
import { GetAllUsefulLinksQuery } from './get-all-useful-links.query';
import { UsefulLinkResponse } from '../../commands/create-useful-link/useful-link.response';

@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
  async execute(query: GetAllUsefulLinksQuery): Promise<UsefulLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const usefulLinks = await UsefulLink.find({ skip, take });
    return plainToInstance(UsefulLinkResponse, usefulLinks, { excludeExtraneousValues: true });
  }
}
