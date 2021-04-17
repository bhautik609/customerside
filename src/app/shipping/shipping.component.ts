import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { registration } from '../registartion/registartion';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  user_update: FormGroup;
  userid;
  constructor(private _user:RegistrationService,private _router:Router) { }

  ngOnInit(): void {
    this.userid=localStorage.getItem('id');
    console.log(this.userid);
    this._user.getuserbyId(this.userid).subscribe((data:registration[])=>{
      console.log(data);
      this.formDataBind(data[0]);
    });
    this.user_update = new FormGroup({
      u_EmailId: new FormControl(null),
      u_Name: new FormControl(null),
      u_Address: new FormControl(null),
      // u_gender: new FormControl(null),
      // u_Type: new FormControl(),
      //u_password: new FormControl(null),
      u_mobileno: new FormControl(null),
      // u_dob: new FormControl(null),
      // u_img: new FormControl(null)
    });
  }
  formDataBind(item:registration){
    this.user_update.patchValue({
      u_EmailId: item.user_email,
      u_Name: item.user_name,
      u_Address: item.user_address,
      // u_gender: item.u_gender,
      // u_Type: item.u_Type,
      // u_password: item.u_password,
      u_mobileno: item.user_mob,
      // u_dob: item.u_dob,
      // u_img: item.u_img,

    });
  }
  onUserUpdate(){
    this._user.updateShippingDetails(this.userid, this.user_update.value).subscribe(
      (data: registration[]) => {
        console.log(data);
        this._router.navigate(['/payment']);
      });
  }
}
