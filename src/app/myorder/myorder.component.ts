import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MyorderService } from './myorder.service';
import{orders}from './orders';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  arr:orders[] = [];
  fk_u_EmailId: string;
  u_EmailId: string = '';
  orderDetails: any[];
  processing: string;
  arrMyOrder: any[];
  Display: boolean = false;
  Display2: boolean = false;
  od: number;
  status: string;
  delivery_date: string;
  bill_date: string;
  delId: string;
  warncancel: boolean = false;
  payment_method: string;
  order_amt: number;
  orderDelDialog: boolean = true;
  walletDetails: any[];
  wallet_amt: number;
  wallet_id: number;
  detail_id: number;
  id;
  constructor(private _order:MyorderService,private _router:Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    this._order.getMyOrderById(this.id).subscribe(
      (dataMyOrder: any[]) => {
        console.log(dataMyOrder);
        this.arrMyOrder = dataMyOrder;
      }
    );
  }
  OnMyOrderViewMore(order_id:number){
    this._router.navigate(['/viewMoreMyOrder', order_id]);
  }
  confirmOrderCancel(od){}
  OnStatusChack(id:number){}
  OnOrderCancel(){}

}
