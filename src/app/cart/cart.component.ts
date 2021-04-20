import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registration } from '../registartion/registartion';
import { RegistrationService } from '../registration.service';
import { CartDetails } from './cartdetail';
import { CartoperationService } from './cartoperation.service';
import { Maincart } from './maincart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  proQty;
  //demo = this.proQty;
  ipq;
  pn: string;
  spcl_instruction: string;
  flag: Boolean = false;
  UserId: string = localStorage.getItem('u_EmailId');
  arrcartItems: CartDetails[]=[];
  memberOfferPrice: number;
  perDiscount: number;
  productarr: string[] = [];
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  userType: string;
  divMember: boolean = false;
  customermember: boolean = false;
  ans: number;
  ansdic: number;
  Finalamount: number;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;

 
  constructor(private _cart:CartoperationService,private _router:Router,private _user:RegistrationService) { }
  OnAddDetails() {
    if (localStorage.getItem('username') == null) {
      this._router.navigate(['/login']);
    }
    else {
      localStorage.setItem('Finalamount', this.GrandTotal + "");
      // console.log(this.GrandTotal);
      this._router.navigate(['/shipping']);
    }
  }
  ngOnInit(): void {
    console.log(this.arrcartItems);
    console.log(this.cart);
    this.GrandTotal = this.cart.GrandTotal;
    if (localStorage.getItem('cart') != null) {
       let cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
      if (this.cart.CartItems?.length >= 0) {
        this.arrcartItems = this.cart.CartItems;
        console.log(this.arrcartItems);
      }
      this.GrandTotal = this.cart.GrandTotal;
    }
    // if (localStorage.getItem('username') != null) {

    //   this._user.getuserbyemailid(localStorage.getItem('u_EmailId')).subscribe(
    //     (dataUser: registration[]) => {
    //       console.log(dataUser);
    //       this.userType = dataUser[0].user_type;
    //       if (this.userType == '1') {
    //         console.log(dataUser);
    //         this.memberSerObj.OffersDetails(localStorage.getItem('u_EmailId')).subscribe(
    //           (dataOfferDetails: any[]) => {
    //             let offer_Price = dataOfferDetails[0].offer_Price;
    //             console.log(offer_Price);
    //             if (offer_Price == 600) {
    //               this.perDiscount = 8;
    //             }
    //             else {
    //               this.perDiscount = 12;
    //             }
    //             this.ans = this.cart.GrandTotal;
    //             this.ansdic = this.ans * this.perDiscount / 100;
    //             console.log(Math.round(this.ans - this.ansdic));
    //             this.GrandTotal = Math.round(this.ans - this.ansdic);
    //             this.divMember = true;
    //           }
    //         );
    //       }
    //       if (this.userType != 'member') {
    //         this.GrandTotal += 40;
    //         this.customermember = true;
    //       }
    //     }
    //   );

    // }
    
  }
  onRemoveFromCart(SelectedProductID, index) {
    this.GrandTotal = this._cart.onRemoveFromCart(SelectedProductID);
    this.arrcartItems.splice(index, 1);
  }
  onQtyChange(item: CartDetails, txtQty: string, index: number) {
    // console.log("selected item ", item);
    console.log("latest value ", txtQty);
    // item.SubTotal = +txtQty * item.Product.pro_price;
    // let x: CartDetails[] = [item];
    // this.GrandTotal = this._cartService.doGrandTotal(x);
    console.log(item.Product.product_qty);

    item.Quantuty = +txtQty;

    item.SubTotal = this._cart.doSubTotal(item.Product.product_price, item.Quantuty);
    this.cart.CartItems[index] = item;
    this.cart.GrandTotal = this._cart.doGrandTotal(this.cart.CartItems);
    this.GrandTotal = this.cart.GrandTotal;

    localStorage.setItem('cart', JSON.stringify(this.cart));
    let abc = parseInt(txtQty);
    this.ipq = item.Product.product_qty;
    this.proQty = parseInt(txtQty);
    if (abc > item.Product.product_qty) {

      //console.log("sorrynot avilable");

      this.flag = true;
      this.pn = item.Product.product_name;
      localStorage.setItem('Finalamount', this.GrandTotal + "");
      console.log(this.GrandTotal);


    }
    localStorage.setItem('Finalamount', this.GrandTotal + "");
      console.log(this.GrandTotal);


  }
  
  

  }



