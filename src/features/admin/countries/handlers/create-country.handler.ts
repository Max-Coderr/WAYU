import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { Country } from '../country.entity';
import { CreateCountryCommand } from '../commands/create-country.command';
import { CountryResponse } from '../responses/country.response';

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
