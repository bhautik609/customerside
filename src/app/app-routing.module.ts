import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ViewmororderComponent } from './myorder/viewmororder/viewmororder.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductdisplaybycatComponent } from './productdisplaybycat/productdisplaybycat.component';
import { ProducthomeComponent } from './producthome/producthome.component';
import { RegistartionComponent } from './registartion/registartion.component';
import { SerchpageComponent } from './serchpage/serchpage.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ThankorderngComponent } from './thankorderng/thankorderng.component';
import { ViwemorproductComponent } from './viwemorproduct/viwemorproduct.component';

const routes: Routes = [
  {path:'',component:ProducthomeComponent},
  {path:'login',component:LoginComponent},
  {path:'regi',component:RegistartionComponent},
  {path:'myaccount',component:MyaccountComponent},
  {path:'viewmoreproduct/:product_id',component:ViwemorproductComponent},
  {path:'cart',component:CartComponent},
  {path:'shipping',component:ShippingComponent},
  {path:'payment',component:PaymentComponent},
  {path:'con',component:ContactusComponent},
  {path:'help',component:HelpComponent},
  {path:'myorder',component:MyorderComponent},
  {path:'serchpage/:txtSearch',component:SerchpageComponent},
  {path:'productdroup/:cat_id',component:ProductdisplaybycatComponent},
  {path:'viewMoreMyOrder/:order_id',component:ViewmororderComponent},
  { path: 'pagenotfound', component:PagenotfoundComponent },
  {path:'thanksOrder/:OrderID',component:ThankorderngComponent},
  { path: '**', redirectTo: '/pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
