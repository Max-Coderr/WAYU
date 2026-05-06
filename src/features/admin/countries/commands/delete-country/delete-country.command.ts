export interface IDeleteCountryCommand {
  id: number;
}

export class DeleteCountryCommand implements IDeleteCountryCommand {
  constructor(public id: number) {}
}
