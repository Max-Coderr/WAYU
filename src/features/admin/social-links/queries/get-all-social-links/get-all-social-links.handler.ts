import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { SocialLink } from '../../social-link.entity';
import { GetAllSocialLinksQuery } from './get-all-social-links.query';
import { SocialLinkResponse } from '../../commands/create-social-link/social-link.response';

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
  async execute(query: GetAllSocialLinksQuery): Promise<SocialLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const socialLinks = await SocialLink.find({ skip, take });
    return plainToInstance(SocialLinkResponse, socialLinks, { excludeExtraneousValues: true });
  }
}
