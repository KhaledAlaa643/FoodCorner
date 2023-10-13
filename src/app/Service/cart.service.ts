import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, catchError, map, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartEventService } from './cart-event.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';
  private cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private cartKey = 'cartItems';

  constructor(private http: HttpClient,
              private cartEventService: CartEventService) {
    this.initCartItemsFromLocalStorage();
  }

sendCartItems(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
  }

  // Update the local storage with the updated cart items
  private updateCartLocalStorage(cartItems: FoodCorner[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  removeFromCart(food: FoodCorner): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);
    this.cartItemsSubject.next(updatedItems);

    // Update local storage with the updated cart items
    this.updateCartLocalStorage(updatedItems);
    this.cartEventService.emitCartUpdated();

  }



private initCartItemsFromLocalStorage(): void {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    this.cartItemsSubject.next(cartItemsFromLocalStorage);
  }


loadCartItemsFromLocalStorage(): void {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  // Load cart items from local storage on service initialization
  this.cartItemsSubject.next(cartItems);
  }

addToCart(food: FoodCorner): any {
    // this.cartItemsSubject.next([...this.cartItemsSubject.value, food]);
    // this.cartEventService.emitCartUpdated();
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, food];
    this.cartItemsSubject.next(updatedCartItems);
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
    return this.http.get<FoodCorner[]>(this.apiUrl);
  }

setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
    // return this.http.put<FoodCorner[]>(this.apiUrl, cartItems);
      return this.cartItems$;

  }

clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

}
