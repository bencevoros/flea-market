export class Bid {
  constructor(
    public amount: number,
    public date?: Date,
    public userId?: number,
    public itemId?: number,
    public id?: number,
  ) { }
}
