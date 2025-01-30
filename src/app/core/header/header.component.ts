import { Component,  DestroyRef,  ElementRef,  HostListener,  inject,  OnInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { FoodDetailsComponent } from '../../Components/food-details/food-details.component';
import { LocalstorageService } from 'src/app/Service/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: FoodCorner[] = [];
  colorCart!:any;
  userStatus: boolean = false
  isMobile = false;
  length !: any
  close!:any
  @ViewChild('popupComp') popupComponent!:PopupComponent
  constructor(
    private authService: AuthService,
    private CartItemsService: CartItemsService,
    private router: Router,
    private el: ElementRef,
    private destroyRef:DestroyRef,
    // private destroyRef2 = inject(DestroyRef)
  ) {
  }
  closeNavbar() {
    const yourDiv = this.el.nativeElement.querySelector('#navbarSupportedContent');
    if (yourDiv) {
      yourDiv.classList.remove('show');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
  ngOnInit(): void {
    const cartItemsSubscription = this.CartItemsService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.length = cartItems.length;
    });
    // subscribe in login & logout
    const authSubscription =this.authService.userStatus().subscribe(status => {
      this.userStatus = status
    })
    this.checkScreenWidth();

    
    this.destroyRef.onDestroy(()=>  {
      cartItemsSubscription.unsubscribe();
      authSubscription.unsubscribe()
    })
  }

logout(): void {
    this.authService.logout();
  }

openPopup() {
  this.popupComponent?.open_modal();
  
}
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 993; 
  }
}
