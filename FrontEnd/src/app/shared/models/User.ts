export class User {
  constructor(
    public email: string,
    public password: string,
    public role: 'admin' | 'user',
    public token?: string
  ) {}

  static fromJson(json: any): User {
    return new User(
      json.email,
      json.password,
      json.role,
      json.token
    );
  }
}
