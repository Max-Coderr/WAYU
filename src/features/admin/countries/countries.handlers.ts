import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { Country } from '@/features/admin/countries/country.entity';
import { CreateCountryCommand, DeleteCountryCommand } from '@/features/admin/countries/countries.commands';
import { GetAllCountriesQuery, GetCountryByIdQuery } from '@/features/admin/countries/countries.queries';
import { CountryResponse } from '@/features/admin/countries/countries.responses';

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
  async execute(command: CreateCountryCommand): Promise<CountryResponse> {
    const exists = await Country.existsBy({ title: ILike(command.title) });
    if (exists) {
      throw new BadRequestException('Country title is already taken');
    }

    const country = Country.create({ title: command.title, flag: command.flag } as Country);
    await Country.save(country);

    return plainToInstance(CountryResponse, country, { excludeExtraneousValues: true });
  }
}

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
  async execute(command: DeleteCountryCommand): Promise<void> {
    const deleted = await Country.delete(command.id);
    if (deleted.affected === 0) {
      throw new NotFoundException('Country not found');
    }
  }
}

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesQuery> {
  async execute(query: GetAllCountriesQuery): Promise<CountryResponse[]> {
    const take = query.filters.size ?? 10;
    const page = query.filters.page ?? 1;
    const skip = (page - 1) * take;

    const countries = await Country.find({ skip, take });
    return plainToInstance(CountryResponse, countries, { excludeExtraneousValues: true });
  }
}

@QueryHandler(GetCountryByIdQuery)
export class GetCountryByIdHandler implements IQueryHandler<GetCountryByIdQuery> {
  async execute(query: GetCountryByIdQuery): Promise<CountryResponse> {
    const country = await Country.findOneBy({ id: query.id });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return plainToInstance(CountryResponse, country, { excludeExtraneousValues: true });
  }
}
