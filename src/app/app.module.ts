import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule}from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { ProducthomeComponent } from './producthome/producthome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistartionComponent } from './registartion/registartion.component';
import{ MatIconModule } from '@angular/material/icon';
import{MatRadioModule}from '@angular/material/radio';
import{MatCardModule}from '@angular/material/card';
import { DialogModule } from 'primeng/dialog';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ViwemorproductComponent } from './viwemorproduct/viwemorproduct.component';
import { CartComponent } from './cart/cart.component';
import{MatSnackBarModule}from '@angular/material/snack-bar';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { MyorderComponent } from './myorder/myorder.component';
import { SerchpageComponent } from './serchpage/serchpage.component';
import { ProductdisplaybycatComponent } from './productdisplaybycat/productdisplaybycat.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ThankorderngComponent } from './thankorderng/thankorderng.component';
import { ViewmororderComponent } from './myorder/viewmororder/viewmororder.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ProducthomeComponent,
    LoginComponent,
    RegistartionComponent,
    MyaccountComponent,
    ViwemorproductComponent,
    CartComponent,
    ShippingComponent,
    PaymentComponent,
    ContactusComponent,
    HelpComponent,
    MyorderComponent,
    SerchpageComponent,
    ProductdisplaybycatComponent,
    PagenotfoundComponent,
    ThankorderngComponent,
    ViewmororderComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    DialogModule,
    MatSnackBarModule,
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
