export class SignInCommand {
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}
}
