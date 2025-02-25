import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartStorageService } from './cart-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  public cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  private itemAddedToCart = new BehaviorSubject<boolean>(false);
  private itemRemovedSubject = new Subject<void>();

  public cartItems$ = this.cartItemsSubject.asObservable();
  itemAddedToCart$: Observable<boolean> = this.itemAddedToCart.asObservable();

  hasItems$ = this.hasItemsSubject.asObservable();
  itemRemoved$ = this.itemRemovedSubject.asObservable();

  private isLoaded = false;
constructor(
  private cartStorageService:CartStorageService 
) {  
}

hasItemId(id:any) {
  const currentCartItems = this.cartItemsSubject.getValue();
  return currentCartItems.some((item: { id: any }) => item.id === id);
}
updateCartState(hasItems: boolean) {
  this.hasItemsSubject.next(hasItems);
}

updateCartItems(cartItems: FoodCorner[]): void {
  this.cartItemsSubject.next(cartItems);
}

setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
  this.cartItemsSubject.next(cartItems);
  return this.cartItems$;
}

loadCartItems(): void {
  if (!this.isLoaded) {
    this.itemAddedToCart.next(true)
    const storedItems = this.cartStorageService.loadCartItems();
    this.cartItemsSubject.next(storedItems);
    this.isLoaded = true; 
  }
}

private saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
  this.cartStorageService.saveCartItems(cartItems);
  }

addToCart(item: FoodCorner): void {
  try {
    this.itemAddedToCart.next(true);
    const currentItems = this.cartItemsSubject.getValue();

    if (item && item.id) {
      const existingItem = currentItems.find((food) => food.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        currentItems.push(item);
      }

      // Filter out any invalid items
      const filteredCartItems = currentItems.filter((food) => food && food.id);

      this.cartItemsSubject.next(filteredCartItems);
      this.saveCartItemsToLocalStorage(filteredCartItems);
    } else {
      console.error('Invalid item provided:', item);
    }
  } 
  catch (error) {
    console.error('Error adding item to cart:', error);
  }
}

notifyItemRemoved():void{
  this.itemRemovedSubject.next();
  }

updateCartItemsInLocalStorage(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
    this.saveCartItemsToLocalStorage(cartItems);
  }

removeFromCart(food: FoodCorner): void {
  try {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);
    this.cartItemsSubject.next(updatedItems);
    this.cartStorageService.saveCartItems(updatedItems);
  } 
  catch (error) {
    console.error('Error removing item from cart:', error);
  }
}
}
