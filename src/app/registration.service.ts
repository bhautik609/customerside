import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders}from "@angular/common/http";
import { environment } from "../environments/environment";
import { registration } from './registartion/registartion';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url:string='http://localhost:3000/_user/';
  url1:string='http://localhost:3000/shipping/';
  url2:string='http://localhost:3000/admin/';
  constructor(private _http:HttpClient) { }
//   adduser(obj:registration){
//     let body=JSON.stringify(obj);
//     let head=new HttpHeaders().set(environment.headname,environment.headvalue);
//     return this._http.post(this.url,body,{headers:head});
// }
adduser(obj:FormData){
       
  return this._http.post(this.url,obj);
}
getuserbyId(user_id){
  return this._http.get(this.url+user_id);
}
//  edituser(obj:registration){
//    let body=JSON.stringify(obj);
//    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
//    return this._http.put(this.url,body,{headers:head});
//     }
 edituser(user_id, item) {
   return this._http.put(this.url + user_id, item);
 }
 updateShippingDetails(user_id, item) {
  //return this._http.put(this.url + user_id, item);
  let body=JSON.stringify(item);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url1+user_id,body,{headers:head});
  //let body = JSON.stringify(item);
  //console.log(item);
  //let head1 = new HttpHeaders().set(environment.header, environment.value);
  //return this._http.put(this.ShippingUrl + u_EmailId, body, { headers: head1 });

}
getUserByEmail(u_EmailId: string) {
  return this._http.get(this.url2 + u_EmailId);
}
}
