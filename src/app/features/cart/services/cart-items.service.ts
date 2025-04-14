import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCorner } from '../../foods/models/FoodCorner';
import { CartStorageService } from './cart-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  readonly cartItemIds = signal(new Set<number>()); 
  private isLoaded = false;
  private cartItemsIdsSubject = new BehaviorSubject<Set<number>>(this.cartItemIds());
  private readonly cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  readonly cartItems$ : Observable<FoodCorner[]> = this.cartItemsSubject.asObservable();

constructor(private cartStorageService:CartStorageService,
) {  
  this.loadCartItems()
}

loadCartItems(): void {
  if (!this.isLoaded) {
    // get data from local storage
    const storedItems = this.cartStorageService.loadCartItems();

    // emit the data in cart items
    this.cartItemsSubject.next(storedItems);

    // extract ids to check id is in cart or not
    // Update the Set and trigger UI update
    const storedItemsIds = storedItems.map(item => item.id)    
    this.cartItemIds.set(new Set<number>(storedItemsIds));

    this.isLoaded = true;
  }
}

addToCart(food: FoodCorner): void {
    if (!food || !food.id  || this.cartItemIds().has(food.id)) return;

    try {
      const updatedCartItems = [...this.cartItemsSubject.getValue(), food]      
      this.cartItemsSubject.next(updatedCartItems);

      const updatedSet = new Set(updatedCartItems.map(item => item.id));
      this.cartItemIds.set(updatedSet);
      this.cartItemsIdsSubject.next(updatedSet);
      this.cartStorageService.saveCartItems(updatedCartItems)
    }
    catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

removeFromCart(food: FoodCorner): void {
  try {
    if (!this.cartItemIds().has(food.id)) return; // Skip if item not in cart

    this.cartItemIds().delete(food.id);

    // 🔹 Update the items list
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);

    // 🔹 Update state and storage
    this.cartItemsSubject.next(updatedItems);
    this.cartStorageService.saveCartItems(updatedItems); 

    this.cartItemsIdsSubject.next(new Set(this.cartItemIds()))
  } 
  catch (error) {
    console.error('Error removing item from cart:', error);
  }
}

increaseQuantity(food: FoodCorner): void {
  if (food.quantity < 100) {
    food.quantity++;
    this.updateFoodInLocalStorage(food)
  }
}

decreaseQuantity(food: FoodCorner): void {
  if (food.quantity > 1) {
    food.quantity--;
    this.updateFoodInLocalStorage(food)
  }
}

updateFoodInLocalStorage(food: FoodCorner): void {
  const storedItems = this.cartStorageService.loadCartItems();
  const cartItem = storedItems.find((item: FoodCorner) => item.id === food.id);
    if (cartItem) {
      cartItem.quantity = food.quantity;
      this.cartStorageService.saveCartItems(storedItems);
    }
}
}
