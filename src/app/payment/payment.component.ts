import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartDetails } from '../cart/cartdetail';
import { Maincart } from '../cart/maincart';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {
  finalAmount: number = 1;
  arrcartItems: CartDetails[] = [];
  productarr: string[] = [];
  qty: any[];
  spcl_instruction: string;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  UserId: string = localStorage.getItem('username');
  paymenterr: boolean = false;
  walltetFlag: boolean = false;
  walletDetails: any[];
  insuff: boolean = false;
  walletAmount: number;
  @ViewChild("paypal") paypalele: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
