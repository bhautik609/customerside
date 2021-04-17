import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public url: string = environment.url + "feedback/";
  constructor(private _http: HttpClient) { }
  addFeedback(item) {

    console.log(item);
    return this._http.post(this.url, item);
  }
}
