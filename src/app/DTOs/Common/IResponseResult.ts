export interface IResponseResult<T> {
  status: string;
  //از هر نوعی باشه
  data: T;
}
