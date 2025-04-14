import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TableModule } from 'primeng/table'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { CartModule } from './features/cart/cart.module';
import { CheckoutModule } from './features/checkout/checkout.module';
import { FoodModule } from './features/foods/food.module';
import { TrackOrderModule } from './features/track-order/track-order.module';
import { AboutModule } from './pages/about/about.module';
import { ContactModule } from './pages/contact/contact.module';
import { HomeModule } from './pages/home/home.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { BookModule } from './features/book/book.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgScrollbarModule,
    NgbModule,
    CoreModule,
    SharedModule,
    HomeModule,
    CartModule,
    CheckoutModule,
    FoodModule,
    ContactModule,
    NotFoundModule,
    AuthModule,
    TrackOrderModule,
    BookModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
