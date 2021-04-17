import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  em: string;

  FeedbackForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.FeedbackForm = new FormGroup({
      fk_u_EmailId: new FormControl(null),
      feedback_msg: new FormControl(null),
      feedback_date: new FormControl(null)
    });
  }
  onSubmitMessage() {}
}
