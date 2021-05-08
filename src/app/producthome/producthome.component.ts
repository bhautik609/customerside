import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartDetails } from '../cart/cartdetail';
import { CartoperationService } from '../cart/cartoperation.service';
import { Maincart } from '../cart/maincart';
import { ProductService } from '../product.service';
import { product } from './product';

@Component({
  selector: 'app-producthome',
  templateUrl: './producthome.component.html',
  styleUrls: ['./producthome.component.css']
})
export class ProducthomeComponent implements OnInit {
  obj:product[]=[];
  cartProductItem: product = null;
  currentCartItem: CartDetails = null;
  SubTotal = 0;
  GrandTotal = 0;
  responsiveOptions;
  seacrhArray: product[] = [];
  TopSellingProducts: any[] = [];
  UserId: string = localStorage.getItem('username');
  dataTopsell: any[];
  constructor(private _productdata:ProductService,private _router:Router,private _cart:CartoperationService,private _sankbar:MatSnackBar) { 
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
   


  ngOnInit(): void {
    
    this._productdata.getAllproduct().subscribe((data:product[])=>{
      this.obj=data;
      console.log(data);
    });
  }
  
  onAddToCart(item){
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
  onRemoveFromCart(SelectedProductID) {
    if (this.UserId != null) {
      this._cart.onRemoveFromCart(SelectedProductID);
  }  }

  ImageViewMore(item:product){
  this._router.navigate(['/viewmoreproduct',item.product_id]);  
  }
}
