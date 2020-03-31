export class Item {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public userId?: number,
    public id?: number,
  ) { }
}
