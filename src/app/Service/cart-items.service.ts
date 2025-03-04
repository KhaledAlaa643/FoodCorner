import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartStorageService } from './cart-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private isLoaded = false;
  private cartItemIds = new Set<number>(); 

  private readonly cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  readonly cartItems$ : Observable<FoodCorner[]> = this.cartItemsSubject.asObservable();

constructor(private cartStorageService:CartStorageService) {  
  this.loadCartItems()
}

isInCartItem(id:number) :boolean{  
  return this.cartItemIds.has(id);
  }

loadCartItems(): void {
  if (!this.isLoaded) {
    // get data from local storage
    const storedItems = this.cartStorageService.loadCartItems();
    this.cartItemsSubject.next(storedItems);

    // extract ids to check id is in cart or not
    const storedItemsIds = storedItems.map(item => item.id)    
    this.cartItemIds = new Set<number>(storedItemsIds);

    this.isLoaded = true;
  }
  }

addToCart(food: FoodCorner): void {
    if (!food || !food.id  || this.cartItemIds.has(food.id)) return;

    try {
      const updatedCartItems = [...this.cartItemsSubject.getValue(), food]      
      this.cartItemsSubject.next(updatedCartItems);

      this.cartItemIds.add(food.id);

      this.cartStorageService.saveCartItems(updatedCartItems)
    }
    catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

removeFromCart(food: FoodCorner): void {
  try {
    if (!this.cartItemIds.has(food.id)) return; // Skip if item not in cart

    this.cartItemIds.delete(food.id);

    // 🔹 Update the items list
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);

    // 🔹 Update state and storage
    this.cartItemsSubject.next(updatedItems);
    this.cartStorageService.saveCartItems(updatedItems);
  } 
  catch (error) {
    console.error('Error removing item from cart:', error);
  }
  }
}
