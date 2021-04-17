import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { registration } from './registartion/registartion';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string='http://localhost:3000/login/';
  constructor(private _http:HttpClient) { }
  getcustomer(obj:registration){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
}
