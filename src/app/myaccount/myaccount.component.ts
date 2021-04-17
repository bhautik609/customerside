import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { registration } from '../registartion/registartion';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  user_update:FormGroup;
  user_id;
  photourl;
  selectedfile:File=null;
  constructor(private _userdata:RegistrationService) { }

  ngOnInit(): void {
    this.user_id=localStorage.getItem("id");
    this._userdata.getuserbyId(this.user_id).subscribe((data:registration[])=>{
      console.log(data);
      this.onbind(data[0]);
      // this.user_update.patchValue({
      //   user_id:data[0].user_id,
      // user_password:data[0].user_password,
      //   user_name:data[0].user_name,
      //   user_email:data[0].user_email,
      //   user_age:data[0].user_age,
      //   user_gender:data[0].user_gender,
      //   user_mob:data[0].user_mob,
      //   user_address:data[0].user_address,
      //   user_type:data[0].user_type
      // });
    });
    this.user_update= new FormGroup({
      user_name:new FormControl(null,Validators.required),
      user_password:new FormControl(null,Validators.required),
      user_email:new FormControl(null,[Validators.required,Validators.email]),
      user_age:new FormControl(null,Validators.required),
      user_gender:new FormControl(null),
      user_mob:new FormControl(null,Validators.required),
      user_address:new FormControl(null,Validators.required),
      
       user_type:new FormControl(null),
      });
  }
  onUserUpdate(){
    const fd=new FormData();
    
    fd.append('user_name',this.user_update.get('user_name').value);
    fd.append('user_password',this.user_update.get('user_password').value);
    fd.append('user_email',this.user_update.get('user_email').value);
    fd.append('user_age',this.user_update.get('user_age').value);
    fd.append('user_gender',this.user_update.get('user_gender').value);
    fd.append('user_mob',this.user_update.get('user_mob').value);
    fd.append('user_address',this.user_update.get('user_address').value);
    fd.append('user_type',this.user_update.get('user_type').value);
    if (this.selectedfile != null) {
      fd.append('user_img',this.selectedfile,this.selectedfile.name);
    }
    else {
      fd.append('user_img', this.user_update.get('user_img').value);
    }
    console.log(fd);
    console.log(this.user_update.value);
    this._userdata.edituser(this.user_id,fd).subscribe((data:any)=>{
      console.log(data);
      if(data.affectedRow==1)
      {
        alert('data updated succesfully');
    
      }
      else{
        alert('something went wrong');
        console.log(data);
      }
    });
  }
  onupdate(){}
  onFileAdd(value){
    this.selectedfile=<File>value.target.files[0];
   }
   onbind(item:registration){
    this.photourl = environment.url + "/images/user/" + item.user_img; 
    this.user_update.patchValue({
      user_id:item.user_id,
    user_password:item.user_password,
      user_name:item.user_name,
      user_email:item.user_email,
      user_age:item.user_age,
      user_gender:item.user_gender,
      user_mob:item.user_mob,
      user_address:item.user_address,
      user_type:item.user_type,
      user_img:item.user_img

    });

   }
}
