import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { cat } from './cat';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username:string;
flage=false;
flage1=true;
obj:cat[]=[];
  constructor(private _router:Router,private _catdat:CategoryService) { }

  ngOnInit(): void {
    
    
    this.username=localStorage.getItem("username");
    console.log(this.username);
    if(localStorage.getItem("username")==null)
    {
        this.flage=true;
    }
    else{
      this.flage=false;
    }
    if(localStorage.getItem("username")!==null)
  {
    this.flage1=true;
  }
  else
  {
    this.flage1=false;
  }
  this._catdat.getAllcat().subscribe((data:cat[])=>{
    this.obj=data;
    console.log(data);
  });

  }
  onLogout(){
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('username1');
    this._router.navigate(['/']);
    if(localStorage.getItem("username")==null)
    {
        this.flage=true;
    }
    else{
      this.flage=false;
    }
    if(localStorage.getItem("username")!==null)
  {
    this.flage1=true;
  }
  else
  {
    this.flage1=false;
  }

  }

}
