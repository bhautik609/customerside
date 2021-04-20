import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetails } from '../cart/cartdetail';
import { CartoperationService } from '../cart/cartoperation.service';
import { Maincart } from '../cart/maincart';
import { ProductService } from '../product.service';
import { product } from '../producthome/product';

@Component({
  selector: 'app-serchpage',
  templateUrl: './serchpage.component.html',
  styleUrls: ['./serchpage.component.css']
})
export class SerchpageComponent implements OnInit {
  searchArray;
  pro_name;
  arr: product[] = [];
  cartProductItem: product = null;
  currentCartItem: CartDetails = null;
  SubTotal = 0;
  GrandTotal = 0;
  seacrhArray: product[] = [];
  UserId: string = localStorage.getItem('username');
  constructor(private _product:ProductService,private _cart:CartoperationService,private _sankbar:MatSnackBar,private _act:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this._act.params.subscribe((data) => {
      this.pro_name = data.txtSearch;

      console.log(this.pro_name);
      this._product.SeacrchTextBox(this.pro_name).subscribe(
        (dataSearch: product[]) => {
          console.log(dataSearch);
          // this.arr = dataSearch;
          this.searchArray = dataSearch;
        }
      );
    });
  }
  onAddToCart(item: product){
    console.log(item);
    this.cartProductItem=item;
    this.SubTotal = this._cart.doSubTotal(this.cartProductItem.product_price, 1);
    this.currentCartItem = new CartDetails(this.cartProductItem, 1, this.SubTotal);
    if (localStorage.getItem('cart') == null) {
      const cartItems: CartDetails[] = [];
      cartItems.push(this.currentCartItem);
      this.GrandTotal = this._cart.doGrandTotal(cartItems);
      const myCart = new Maincart(cartItems, this.GrandTotal, this.UserId);
      localStorage.setItem('cart', JSON.stringify(myCart));
     } else {
        const cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
        let index: number = -1;
        if (cart.CartItems?.length>=0){
          index = cart.CartItems.map(function (x) {
            return x.Product.product_id;
          }).indexOf(item.product_id);
        }
        if (index == -1) {
          cart.CartItems?.push(this.currentCartItem);
          cart.GrandTotal = this._cart.doGrandTotal(cart.CartItems);
          // cart.u_EmailId = this.UserId;
          localStorage.setItem('cart', JSON.stringify(cart));
  
        }
        else {
          const cartItem: CartDetails = cart.CartItems[index];
          cartItem.Quantuty += 1;
          cartItem.SubTotal = this._cart.doSubTotal(this.cartProductItem.product_price, cartItem.Quantuty);
          cart.CartItems[index] = cartItem;
  
          cart.GrandTotal = this._cart.doGrandTotal(cart.CartItems);
          // cart.u_EmailId = this.UserId;
  
          localStorage.setItem('cart', JSON.stringify(cart));
        }
  
  
      }
      console.log(localStorage.getItem('cart'));
  
      this._sankbar.open(this.cartProductItem.product_name + 'Added to cart', 'Close', {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
  
  }
  ImageViewMore(pro_id){
    this._router.navigate(['/viewmoreproduct',pro_id]);
  }
}
