import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, catchError, map, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartEventService } from './cart-event.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private cartKey = 'cartItems';
  private cartItems: FoodCorner[] = [];
  cartStateSubject = new BehaviorSubject<boolean>(false);
  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  hasItems$ = this.hasItemsSubject.asObservable();
  constructor(
    private http: HttpClient,
    private cartEventService: CartEventService) {
    this.initCartItemsFromLocalStorage();
  }
  updateCartState(hasItems: boolean) {
    this.hasItemsSubject.next(hasItems);
  }

  // checkCartState() {
  //   const isEmpty = this.cartItems.length === 0;
  //   this.cartStateSubject.next(isEmpty);
  //   localStorage.setItem('cartState', isEmpty ? 'white' : 'orange');

  // }


sendCartItems(cartItems: FoodCorner[]): void {
  this.cartItemsSubject.next(cartItems);
}

  private updateCartLocalStorage(cartItems: FoodCorner[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  removeFromCart(food: FoodCorner): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);
    this.cartItemsSubject.next(updatedItems);
    this.updateCartLocalStorage(updatedItems);
    this.cartEventService.emitCartUpdated();
    // this.checkCartState();
  }



private initCartItemsFromLocalStorage(): void {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    this.cartItemsSubject.next(cartItemsFromLocalStorage);
  }

  id(id:any) {
  
  const currentCartItems = this.cartItemsSubject.getValue();
  return currentCartItems.some((item: { id: any }) => item.id === id);
    
  
}
loadCartItemsFromLocalStorage(): void {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  // this.cartItemsSubject.next(cartItems);
  const filteredCartItems = cartItems.filter((item: any) => item && item.id); // Filter out undefined or items without an ID
  this.cartItemsSubject.next(filteredCartItems);
  
  }

addToCart(food: FoodCorner): any {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, food];
    this.cartItemsSubject.next(updatedCartItems);
    // this.checkCartState();

}


  saveCartItemsToLocalStorage(): void {
    const cartItems = this.cartItemsSubject.value;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

getTotalCartItems(): Observable<number> {
  return this.cartItems$.pipe(
    map((cartItems:any) => cartItems.reduce((total:any, item:any) => total + item.quantity, 0))
  );
}

getCartItems(): Observable<FoodCorner[]> {
    return this.http.get<FoodCorner[]>(`${environment.apiUrl}`);
  }

setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
      return this.cartItems$;

  }

clearCart(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}`);
  }

}
