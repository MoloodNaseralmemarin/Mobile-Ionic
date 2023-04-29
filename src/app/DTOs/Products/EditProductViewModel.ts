export class EditProductViewModel {
  constructor(
    public id: number,
    public productName: string,
    public price: number,
    public shortDescription: string,
    public description: string,
    public currentImage: string,
    public isExists: boolean,
    public isSpecial: boolean,
    public base64Image: string
  ) {
  }
}
