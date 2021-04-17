import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from './feedback.service';
const dateFormat = require('dateformat');
const now = new Date();
declare var require: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  em: string;

  FeedbackForm: FormGroup;
 
  constructor(private _feed:FeedbackService,private _router:Router) { }

  ngOnInit(): void {
    this.FeedbackForm = new FormGroup({
      fk_u_EmailId: new FormControl(null),
      feedback_msg: new FormControl(null),
      feedback_date: new FormControl(null)
    });
    this.em = localStorage.getItem('username');
    if (this.em == "") {
      this.em = "";
    }
    else {
      this.em = localStorage.getItem('username');
    }
    if (localStorage.getItem('username')) {
      this.em = localStorage.getItem('username');
      console.log(this.em);
    }
  }
  onSubmitMessage() {
    let fb = {
      fk_u_EmailId: this.FeedbackForm.get('fk_u_EmailId').value,
      feedback_msg: this.FeedbackForm.get('feedback_msg').value,
      feedback_date: dateFormat(now, "yyyy-mm-dd"),

    }
    this._feed.addFeedback(fb).subscribe(
      (x: any) => {
        console.log(x);
        this._router.navigate(['/']);
      });
  }
}
