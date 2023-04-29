export class RegisterUserViewModel {
  constructor(
    public email: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public confirmPassword: string,
    public address: string
  ) {
  }
}
