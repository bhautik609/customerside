import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { registration } from './registartion';

@Component({
  selector: 'app-registartion',
  templateUrl: './registartion.component.html',
  styleUrls: ['./registartion.component.css']
})
export class RegistartionComponent implements OnInit {
  SignupForm:FormGroup;
  hide=true;
  hide1=true;
  dis: boolean = false;
  selectedfile:File=null;
  constructor(private _regdata:RegistrationService, private _router:Router) { }

  ngOnInit(): void {
    this.SignupForm= new FormGroup({
      user_name:new FormControl(null,Validators.required),
      user_password:new FormControl(null,Validators.required),
      user_email:new FormControl(null,[Validators.required,Validators.email]),
      user_age:new FormControl(null,Validators.required),
      user_gender:new FormControl(null),
      user_mob:new FormControl(null,Validators.required),
      user_address:new FormControl(null,Validators.required),
      
       user_type:new FormControl('1'),
      });
  }
  onSignup(){
    const fd=new FormData();
    fd.append('user_password',this.SignupForm.get('user_password').value);
    fd.append('user_name',this.SignupForm.get('user_name').value);
    fd.append('user_email',this.SignupForm.get('user_email').value);
    fd.append('user_age',this.SignupForm.get('user_age').value);
    fd.append('user_gender',this.SignupForm.get('user_gender').value);
    fd.append('user_mob',this.SignupForm.get('user_mob').value);
    fd.append('user_address',this.SignupForm.get('user_address').value);
    
    fd.append('user_type',this.SignupForm.get('user_type').value);
    fd.append('user_img',this.selectedfile,this.selectedfile.name);
    
    console.log(fd);
    console.log(fd);
    this._regdata.adduser(fd).subscribe((data:any)=>{
      console.log(data);
      if(data.affectedRows==1)
      {
        alert('registartion succesfully');
        this._router.navigate(['/login']);
     
      }
      else{
        alert('something went wrong');
        console.log(data);
      }
    });
    

  }
  onSignupCancel(){
    this._router.navigate(['/']);
  }
  onFileAdd(value){
    this.selectedfile=<File>value.target.files[0];
   }

}
