import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartStorageService } from './cart-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private isLoaded = false;

  private cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  cartItems$ : Observable<FoodCorner[]> = this.cartItemsSubject.asObservable();

  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  hasItems$ : Observable<boolean>= this.hasItemsSubject.asObservable();

  private itemAddedToCartSubject = new BehaviorSubject<boolean>(false);
  itemAddedToCart$ : Observable<boolean> = this.itemAddedToCartSubject.asObservable();

  private itemRemovedSubject = new Subject<void>();
  itemRemoved$ : Observable<void>= this.itemRemovedSubject.asObservable();

constructor(private cartStorageService:CartStorageService) {  
  this.itemAddedToCartSubject.next(true)
  this.loadCartItems()
}

isInCartItem(id:number) {
  return this.cartItemsSubject.getValue().some(item => item.id === id);
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
    const storedItems = this.cartStorageService.loadCartItems();
    this.cartItemsSubject.next(storedItems);
    this.isLoaded = true; 
  }
}

saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
  this.cartStorageService.saveCartItems(cartItems);
  }

addToCart(item: FoodCorner): void {
    if (!item || !item.id) return;
    
    try {
      this.itemAddedToCartSubject.next(true);
  
      const updatedCart = this.getUpdatedCartWithItem(item);
      
      this.cartItemsSubject.next(updatedCart);

      this.saveCartItemsToLocalStorage(updatedCart);
    } 
    catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

private getUpdatedCartWithItem(item: FoodCorner): FoodCorner[] {
  const currentItems = [...this.cartItemsSubject.getValue()]; // Create a new array (avoid mutation)
  const existingItem = currentItems.find((food) => food.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    currentItems.push(item);
  }

  return currentItems.filter((food) => food && food.id); // Remove invalid items
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
