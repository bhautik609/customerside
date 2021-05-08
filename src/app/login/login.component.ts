import { FocusTrapManager } from '@angular/cdk/a11y/focus-trap/focus-trap-manager';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../email.service';
import { LoginService } from '../login.service';
import { registration } from '../registartion/registartion';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true;
loginForm:FormGroup;
obj:registration[];
display123: boolean = false;
  display1: boolean = false;
z;
  constructor(private _logdata:LoginService,private _router:Router,private _user:RegistrationService,private _mail:EmailService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login_username: new FormControl(null),
      login_password: new FormControl(null)
    });
    
  }
  forgotPassword(){
    if (this.loginForm.get('login_username').value == null) {
       this.z = prompt("Enter Email Id");
      if (this.z != null) {
        console.log(this.z);
      }
    }
    let a = this.loginForm.get('login_username').value;
    this._user.getUserByEmail(this.z).subscribe((data) => {
      console.log(data[0]?.user_password);
      this._mail.passwordMail(this.z, "Forgotten Password", " Forgot password request maid for your account .Your Password is   " + data[0]?.user_password + "this is Giftvilla service").subscribe((data) => {
        console.log("mail sent");
      });
    });

  }
  onLogin(){
    console.log(this.loginForm.value);
    this._logdata.getcustomer(this.loginForm.value).subscribe((data:registration[])=>{
      this.obj=data;
      console.log(data);
      if(data.length==1){
        if(this.obj[0].user_type==1){
          localStorage.setItem("username",this.obj[0].user_email);
          localStorage.setItem("id",this.obj[0].user_id+'');
          localStorage.setItem('username1',this.obj[0].user_name);
          localStorage.setItem('user_img1',this.obj[0].user_img);
          this._router.navigate(['/']);
          
        
        }
        else{
          alert('username or password incorrect');
      }
      }
      else{
         alert("username or password incorrect");
         
      }
    });
   
  }
  DontAcc(){}

}
