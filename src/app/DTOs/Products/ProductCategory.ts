import { DatePipe } from '@angular/common';

export class ProductCategory {
  constructor(
    public id: number,
    public createDate: DatePipe,
    public isDelete: boolean,
    public lastUpdateDate: DatePipe,
    public parentId: number,
    public title: string,
    public urlTitle: string,
  ) {
  }
}
