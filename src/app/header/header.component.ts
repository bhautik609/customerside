import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { product } from '../producthome/product';
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
category:product[]=[];
  constructor(private _router:Router,private _catdat:CategoryService,private _product:ProductService) { }

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
    console.log(this.obj);
  });

  }
  onLogout(){
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('username1');
    localStorage.removeItem('cart');
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
  SearchTextBox(txtSearch) {
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/serchpage', txtSearch]);
    }
  }
  SearchTextBox1(txtSearch) {
    location.reload();
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/serchpage', txtSearch]);
    }
  }
  onWatchClick(cat_id){
    console.log(cat_id);
    this._router.navigate(['/productdroup', cat_id]);

  }

}
