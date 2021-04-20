import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string='http://localhost:3000/product/';
  public urlTextBox = environment.url + 'serch/';
  public url2 = environment.url + "catid/";
  constructor(private _http:HttpClient) { }
  getAllproduct(){
    return this._http.get(this.url);
  }
  getproductbyId(product_id:number){
    return this._http.get(this.url+product_id);
  }
  SeacrchTextBox(pro_name) {
    console.log(pro_name);
    return this._http.get(this.urlTextBox + pro_name);
  }
  getproductBycategory(cat_id: number) {
    return this._http.get(this.url2 + cat_id);
  }
  updateproductcategory(cat_id) {
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.get(this.url2 + cat_id);
  }
}
