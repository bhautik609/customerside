import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  public urlMyOrder = environment.url + 'myorder/';
  constructor(private _http: HttpClient) { }
  getMyOrderById(user_id_fk) {
    return this._http.get(this.urlMyOrder + user_id_fk);
  }
}
