export class Item {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public expireDate: Date,
    public createdDate?: Date,
    public userId?: number,
    public id?: number,
  ) { }
}
