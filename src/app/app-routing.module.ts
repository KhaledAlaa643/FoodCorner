import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { FoodDetailsComponent } from './Components/food-details/food-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ContactComponent } from './Components/contact/contact.component';
import { BookComponent } from './Components/book/book.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'food/:id', component: FoodDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard] },
  { path: 'contact', component: ContactComponent },

  { path: 'book', component: BookComponent },
  { path: 'user', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
  },
  { path: '**', component: NotFoundComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
