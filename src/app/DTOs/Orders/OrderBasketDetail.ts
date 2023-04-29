export class OrderBasketDetail {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public imageName: string,
    public count: number,
    public productId: number,
  ) {
  }
}
