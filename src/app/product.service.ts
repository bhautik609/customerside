import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string='http://localhost:3000/product/';
  constructor(private _http:HttpClient) { }
  getAllproduct(){
    return this._http.get(this.url);
  }
  getproductbyId(product_id:number){
    return this._http.get(this.url+product_id);
  }
}
