import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url :string="http://localhost:3000/cat";

  constructor(private _http:HttpClient) {
    
    
  }
  getAllcat(){
    return this._http.get(this.url);
  }
}
