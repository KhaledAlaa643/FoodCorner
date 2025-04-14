import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'home', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  
  { path: 'food/:id', loadChildren: () => import('./features/foods/food.module').then(m => m.FoodModule)},
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) },
  { path: 'checkout', loadChildren:() => import('./features/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule)},
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  { path: 'track-order', loadChildren: () => import('./features/track-order/track-order.module').then(m => m.TrackOrderModule)},

  { path: '**', component: NotFoundComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
