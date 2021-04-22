import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  public urlMyOrder = environment.url + 'myorder/';
  public urlOrderStatus = environment.url + 'UserOrderCheck/';
  public urlMyOrderNotAssign = environment.url + 'ordernotassign/';
  constructor(private _http: HttpClient) { }
  getMyOrderById(user_id_fk) {
    return this._http.get(this.urlMyOrder + user_id_fk);
  }
  getUserOrderCheck(order_id: number) {
    return this._http.get(this.urlOrderStatus + order_id);
  }
   getMyOrderByIdNotAssign(order_id) {
    return this._http.get(this.urlMyOrderNotAssign + order_id)
  }
}
