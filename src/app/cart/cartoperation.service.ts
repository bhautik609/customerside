import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartDetails } from './cartdetail';
import { Maincart } from './maincart';
@Injectable({
  providedIn: 'root'
})
export class CartoperationService {
  url: string = 'http://localhost:3000/order/';
  urlOrderDetail: string = 'http://localhost:3000/orderdetail/';
  public gt:number;
  constructor(private _http:HttpClient,) { }

doSubTotal(Price, Quantity): number {
  return Price * Quantity;
}
onRemoveFromCart(SelectedProductID): number {
  if (localStorage.getItem('cart') != null) {
    let cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
    let index: number = -1;
    if (cart.CartItems.length >= 0) {
      index = cart.CartItems.map(function (x) {
        return x.Product.product_id
      }).indexOf(SelectedProductID);
      if (index != -1) {
        cart.CartItems.splice(index, 1);
        cart.GrandTotal = this.doGrandTotal(cart.CartItems);
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart.GrandTotal;
      }
    }
  }
  return 0;
}
doGrandTotal(CartItems: CartDetails[]): number {
  let GrandTotal: number = 0;
  if (CartItems != null) {
    if (CartItems.length >= 0) {
      for (let i = 0; i < CartItems.length; i++) {
        GrandTotal += CartItems[i].SubTotal;
      }
    }
  }
  return GrandTotal;
}
addorder(item){
  let body=JSON.stringify(item);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.post(this.url,body,{headers:head});
}
addorderdetail(item){
  let body=JSON.stringify(item);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.post(this.url,body,{headers:head});
}
}