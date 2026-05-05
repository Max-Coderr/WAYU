import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CountriesController } from '@/features/admin/countries/countries.controller';
import { SocialLinksController } from '@/features/admin/social-links/social-links.controller';
import { UsefulLinksController } from '@/features/admin/useful-links/useful-links.controller';
import { RepresentativesController } from '@/features/admin/representatives/representatives.controller';
import { CreateCountryHandler } from '@/features/admin/countries/handlers/create-country.handler';
import { DeleteCountryHandler } from '@/features/admin/countries/handlers/delete-country.handler';
import { GetAllCountriesHandler } from '@/features/admin/countries/handlers/get-all-countries.handler';
import { GetCountryByIdHandler } from '@/features/admin/countries/handlers/get-country-by-id.handler';
import {
  CreateSocialLinkHandler,
  UpdateSocialLinkHandler,
  DeleteSocialLinkHandler,
  GetAllSocialLinksHandler,
} from '@/features/admin/social-links/social-links.handlers';
import {
  CreateUsefulLinkHandler,
  UpdateUsefulLinkHandler,
  DeleteUsefulLinkHandler,
  GetAllUsefulLinksHandler,
} from '@/features/admin/useful-links/useful-links.handlers';
import {
  CreateRepresentativeHandler,
  UpdateRepresentativeHandler,
  DeleteRepresentativeHandler,
  GetAllRepresentativesHandler,
} from '@/features/admin/representatives/representatives.handlers';

@Module({
  imports: [CqrsModule],
  controllers: [CountriesController, SocialLinksController, UsefulLinksController, RepresentativesController],
  providers: [
    CreateCountryHandler,
    DeleteCountryHandler,
    GetAllCountriesHandler,
    GetCountryByIdHandler,
    CreateSocialLinkHandler,
    UpdateSocialLinkHandler,
    DeleteSocialLinkHandler,
    GetAllSocialLinksHandler,
    CreateUsefulLinkHandler,
    UpdateUsefulLinkHandler,
    DeleteUsefulLinkHandler,
    GetAllUsefulLinksHandler,
    CreateRepresentativeHandler,
    UpdateRepresentativeHandler,
    DeleteRepresentativeHandler,
    GetAllRepresentativesHandler,
  ],
})
export class AdminModule {}
