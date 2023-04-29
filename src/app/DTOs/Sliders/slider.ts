
import { DatePipe } from '@angular/common';
export class Slider {
  constructor(
    public id: number,
    public imageName: string,
    public title: string,
    public description: string,
    public link: string,
    public isDelete: boolean,
    public createDate: DatePipe,
    public lastUpdateDate: DatePipe
  ) {
  }
}
