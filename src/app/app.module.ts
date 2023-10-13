import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { FoodDetailsComponent } from './Components/food-details/food-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './Components/contact/contact.component';
import { BookComponent } from './Components/book/book.component';
import { TrackOrderComponent } from './Components/track-order/track-order.component'; // Import the BrowserAnimationsModule
// import { MatInputModule } from '@angular/material/input'; // Correct import statement for MatInputModule
// import { MatFormFieldModule } from '@angular/material/form-field'; // Correct import statement for MatFormFieldModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    HomeComponent,
    FoodDetailsComponent,
    NotFoundComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    BookComponent,
    TrackOrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
