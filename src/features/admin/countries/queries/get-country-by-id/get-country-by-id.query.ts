export interface IGetCountryByIdQuery {
  id: number;
}

export class GetCountryByIdQuery implements IGetCountryByIdQuery {
  constructor(public id: number) {}
}
