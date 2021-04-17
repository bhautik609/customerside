import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders}from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  public emailurrl: string = "http://localhost:3000/email";
  public url: string = "http://localhost:3000/_user/";
  constructor(public _http: HttpClient) { }
  passwordMail(u_EmailId, sub, u_password) {
    console.log(u_EmailId, sub, u_password);
    let body = {
      "name": u_EmailId,
      "message": u_password,
      "subject": sub
    }
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.emailurrl, body, { headers: header });
  }
  getuserbyId(user_id){
    return this._http.get(this.url+user_id);
  }
 
}
