import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FoodDetailsComponent } from './Components/food-details/food-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RegisterComponent } from './Components/register/register.component';
import { BookComponent } from './Components/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { CartComponent } from './Components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { StarsPipe } from './pipes/stars.pipe';


@NgModule({
  declarations: [
    StarsPipe,
    CartComponent,
    AppComponent,
    HomeComponent,
    FoodDetailsComponent,
    CheckoutComponent,
    BookComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgScrollbarModule,
    ChartModule,
    TableModule,
    NgbModule ,
    CoreModule,
    MatFormFieldModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
