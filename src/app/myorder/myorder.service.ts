import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  public urlMyOrder = environment.url + 'myorder/';
  public urlOrderStatus = environment.url + 'UserOrderCheck/';
  public urlMyOrderNotAssign = environment.url + 'ordernotassign/';
  public urlOrderCheckedDetails = environment.url + 'DetailsOrderCheck/';
  public urlCancelOrderDetails = environment.url + 'cancleorderdetail/';
  public urlCancelOrder: string = environment.url + 'cancleorder/';
  public urlCancelTrack = environment.url + 'cancelTrack/';
  public urlcancelDelieveryDetails = environment.url + 'cancledelivery/';
  public urlOrderById = environment.url + 'order/';
  public cancletrack = environment.url +'cancletrack/';
  public url: string = environment.url + "orderdel/";
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
  getUserOrderCheckedDetails(order_id: number) {
    return this._http.get(this.urlOrderCheckedDetails + order_id);
  }
  cancelOrder(order_id: number) {
    console.log(order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urlCancelOrder + order_id, { headers: head });
  }
  getWalletDetails(fk_u_EmailId: string) {
    console.log(fk_u_EmailId);
    return this._http.get(this.urlCancelOrder + fk_u_EmailId);
  }
  getOrderById(od: number) {
    console.log(od);
    return this._http.get(this.urlOrderById + od);
  }
  cancelOrderDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urlCancelOrderDetails + fk_order_id, { headers: head });
  }
  cancelTrack(fk_detail_id: number) {
    console.log(fk_detail_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.cancletrack + fk_detail_id, { headers: head });
  }
  cancelDeliveryDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.headname, environment.headvalue);
    return this._http.delete(this.urlcancelDelieveryDetails + fk_order_id, { headers: head });
  }
  addWalletAmount(item) {
    console.log(item);
    return this._http.post(this.urlCancelOrder, item);
  }
  updateWalletAmount(wallet_id, item) {
    console.log(wallet_id, item);
    return this._http.put(this.urlCancelOrder + wallet_id, item);
  }
  getOrderStatus(fk_detail_id: number) {
    return this._http.get(this.urlCancelOrderDetails + fk_detail_id);
  }
  getPtroductById(order_id: number) {
    return this._http.get(this.url + order_id);
  }
}
