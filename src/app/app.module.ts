import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { FoodDetailsComponent } from './Components/food-details/food-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RegisterComponent } from './Components/register/register.component';
import { ContactComponent } from './Components/contact/contact.component';
import { BookComponent } from './Components/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDialogModule } from '@angular/material/dialog';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PopupComponent } from './Components/popup/popup.component';
import { CartComponent } from './Components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    CartComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FoodDetailsComponent,
    NotFoundComponent,
    CheckoutComponent,
    ContactComponent,
    BookComponent,
    PopupComponent,
    RegisterComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    NgScrollbarModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
