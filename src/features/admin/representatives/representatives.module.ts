import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepresentativesController } from './representatives.controller';
import { CreateRepresentativeHandler } from './commands/create-representative/create-representative.handler';
import { UpdateRepresentativeHandler } from './commands/update-representative/update-representative.handler';
import { DeleteRepresentativeHandler } from './commands/delete-representative/delete-representative.handler';
import { GetAllRepresentativesHandler } from './queries/get-all-representatives/get-all-representatives.handler';

@Module({
  imports: [CqrsModule],
  controllers: [RepresentativesController],
  providers: [
    CreateRepresentativeHandler,
    UpdateRepresentativeHandler,
    DeleteRepresentativeHandler,
    GetAllRepresentativesHandler,
  ],
})
export class RepresentativesModule {}
