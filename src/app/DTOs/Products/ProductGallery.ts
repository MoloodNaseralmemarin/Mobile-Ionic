import { DatePipe } from '@angular/common';

export class ProductGallery {
  constructor(
    public id: number,
    public createDate: DatePipe,
    public productId: number,
    public imageName: string
  ) {
  }
}
