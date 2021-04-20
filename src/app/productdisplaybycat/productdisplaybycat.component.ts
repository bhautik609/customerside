import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { CategoryService } from '../category.service';
import { cat } from '../header/cat';
import { ProductService } from '../product.service';
import { product } from '../producthome/product';

@Component({
  selector: 'app-productdisplaybycat',
  templateUrl: './productdisplaybycat.component.html',
  styleUrls: ['./productdisplaybycat.component.css']
})
export class ProductdisplaybycatComponent implements OnInit {
  arr: product[] = [];
  CategoryArr: cat[] = [];
  constructor(private _productData: ProductService,
    private act_rout:ActivatedRoute,private _router: Router,private _catdata:CategoryService) { 
      _router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          let cat_id = this.act_rout.snapshot.params['cat_id'];
          this.getItemByCategory(cat_id);
        }
      });
    }

  ngOnInit(): void {
    this._catdata.getAllcat().subscribe((data:cat[])=>{
      this.CategoryArr = data;
        console.log(data);
      });
      let cat_id = this.act_rout.snapshot.params['cat_id'];
      this.getItemByCategory(cat_id);
  }
  getItemByCategory(CatID:number){
    this._productData.updateproductcategory(CatID).subscribe(
      (data: product[]) => {
      this.arr = data;
      console.log(data);
    
    });
  }
  ImageViewMore(pro_id){
    console.log(pro_id);
    this._router.navigate(['/viewmoreproduct',pro_id]);
  }

}
