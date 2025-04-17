import { Component,  DestroyRef,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FoodCorner } from 'src/app/features/foods/models/FoodCorner';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { CartItemsService } from 'src/app/features/cart/services/cart-items.service';
import { PopupComponent } from 'src/app/features/auth/components/popup/popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: FoodCorner[] = [];
  colorCart!:string;
  userStatus: boolean = false
  close!:any
  cartLength$ = this.CartItemsService.cartLength$;    // subscribe in login & logout
  @ViewChild('popupComp') popupComponent!:PopupComponent
  constructor(
    private authService: AuthService,
    private CartItemsService: CartItemsService,
    private router: Router,
    private el: ElementRef,
    private destroyRef:DestroyRef,
  ) {}
  ngOnInit(): void {    
    const cartItemsSubscription = this.CartItemsService.cartItems$.subscribe(cartItems => this.cartItems = cartItems);

    const authSubscription =this.authService.userStatus().subscribe(status => this.userStatus = status)
    
    this.destroyRef.onDestroy(()=>  {
      cartItemsSubscription.unsubscribe();
      authSubscription.unsubscribe()
    })
  }

closeNavbar() {
    const navbarMenu = this.el.nativeElement.querySelector('#navbarSupportedContent');
    navbarMenu ?  navbarMenu.classList.remove('show') : "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
logout(): void {
    this.authService.logout();
  }

openPopup() {
  this.popupComponent?.open_modal();
  
}
}
