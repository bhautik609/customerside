import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CancleorderService {
  public urlCancelOrderDetails = environment.url + 'orderdetail/';
  public urlCancelOrder: string = environment.url + 'order/';
  public urldeliverr:string=environment.url+'delivery/';
  constructor(public _http: HttpClient) { }
  cancelOrder(order_id: number) {
    console.log(order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urlCancelOrder + order_id, { headers: head });
  }
  getOrderById(od: number) {
    console.log(od);
    return this._http.get(this.urlCancelOrder + od);
  }
  cancelOrderDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urlCancelOrderDetails + fk_order_id, { headers: head });
  }
  cancelDeliveryDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urldeliverr + fk_order_id, { headers: head });
  }
  getOrderStatus(fk_detail_id: number) {
    return this._http.get(this.urldeliverr + fk_detail_id);
  }
}
