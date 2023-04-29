export class ProductCommentViewModel {
  constructor(
    public id: number,
    public text: string,
    public userId: number,
    public userFullName: string,
    public createDate: string
  ) {
  }
}
