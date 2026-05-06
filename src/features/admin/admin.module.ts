import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { RepresentativesModule } from './representatives/representatives.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { UsefulLinksModule } from './useful-links/useful-links.module';

@Module({
  imports: [CountriesModule, RepresentativesModule, SocialLinksModule, UsefulLinksModule],
})
export class AdminModule {}
