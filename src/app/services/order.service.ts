import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IResponseResult} from '../DTOs/Common/IResponseResult';
import {Injectable} from '@angular/core';
import {OrderBasketDetail} from '../DTOs/Orders/OrderBasketDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderDetails: BehaviorSubject<OrderBasketDetail[]> = new BehaviorSubject<OrderBasketDetail[]>(null);


  constructor(private http: HttpClient) {
  }

  _setOrderDetails(details: OrderBasketDetail[]) {
    this.orderDetails.next(details);
  }

  _getOrderDetails(): Observable<OrderBasketDetail[]> {
    return this.orderDetails;
  }

  addProductToOrder(productId: number, count: number): Observable<IResponseResult<{ message: string, details: OrderBasketDetail[] }>> {
    const params = new HttpParams().set('productId', productId.toString()).set('count', count.toString());
    return this.http.get<IResponseResult<{ message: string, details: OrderBasketDetail[] }>>('/order/add-order', {params});
  }

  getUserBasketDetails(): Observable<IResponseResult<OrderBasketDetail[]>> {
    return this.http.get<IResponseResult<OrderBasketDetail[]>>('/order/get-order-details');
  }

  removeOrderDetail(detailId: number): Observable<IResponseResult<OrderBasketDetail[]>> {
    return this.http.get<IResponseResult<OrderBasketDetail[]>>('/order/remove-order-detail/' + detailId);
  }
}
