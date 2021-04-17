import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatService {
  url:string='http://localhost:3000/student/';

  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }
}
