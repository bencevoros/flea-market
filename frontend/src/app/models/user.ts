export class User {
  constructor(
    public email: string,
    public password: string,
    public points?: number,
    public id?: number,
  ) { }
}
