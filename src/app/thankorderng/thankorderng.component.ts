import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetails } from '../cart/cartdetail';
import { Maincart } from '../cart/maincart';
import { registration } from '../registartion/registartion';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-thankorderng',
  templateUrl: './thankorderng.component.html',
  styleUrls: ['./thankorderng.component.css']
})
export class ThankorderngComponent implements OnInit {
  order_id: number;
  ans: number;
  ansdic: number;
  userType: string;
  orderinfo: any[];
  orderDetailinfo: any[];
  arrcartItems: CartDetails[] = [];
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  gt;
  perDiscount: number;
  usercategory: boolean = false;
  constructor(private act_rout: ActivatedRoute, private _usersrc: RegistrationService, private rout: Router) { 
    this.order_id = this.act_rout.snapshot.params['OrderID'];
  }

  ngOnInit(): void {
    this.arrcartItems = this.cart.CartItems;
    // console.log(this.arrcartItems);
    this.gt = localStorage.getItem('Finalamount');
    this._usersrc.getUserByEmail(localStorage.getItem('username')).subscribe(
      (dataUser: registration[]) => {
        console.log(dataUser);
      });
  }
  continueshopping() {
    console.log(localStorage);
    localStorage.removeItem('cart');
    this.rout.navigate(['/']);
  }

}
