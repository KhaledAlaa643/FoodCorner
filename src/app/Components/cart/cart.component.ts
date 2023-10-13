import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartService } from 'src/app/Service/cart.service';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { CartCommunicationService } from 'src/app/Service/cart-communication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  foods: FoodCorner[] = [];
  price: number = 0;
  totalCartItems: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private cartItemsService: CartItemsService,
    private cartCommunicationService: CartCommunicationService
  ) {}

  ngOnInit(): void {

    // Load cart items from local storage during component initialization
    this.cartService.loadCartItemsFromLocalStorage();

    // Subscribe to cartItems$ from the CartService to get updates dynamically
    this.cartItemsService.cartItems$.subscribe((cartItems) => {
      this.foods = cartItems;
      this.calculateTotalPrice();
    });

    // Calculate and update the total cart items
    this.cartService.getTotalCartItems().subscribe((totalItems) => {
    this.totalCartItems = totalItems;
    });
  }

removeFromCart(food: FoodCorner): void {
  this.cartService.removeFromCart(food);
  const index = this.foods.indexOf(food);
  if (index > -1) {
    this.foods.splice(index, 1);
    this.calculateTotalPrice();
      this.cartCommunicationService.notifyItemRemoved(); // Notify item removal
    }
  }

loadCartItemsFromLocalStorage(): void {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemsService.updateCartItems(savedCartItems);
  }

increaseQuantity(food: FoodCorner): void {
    if (food.quantity < 10) {
      food.quantity++;
      this.calculateTotalPrice();
      this.cartItemsService.updateCartItemsInLocalStorage(this.foods); // Update local storage with the new cart items
    }
}


decreaseQuantity(food: FoodCorner): void {
    if (food.quantity > 1) {
      food.quantity--;
      this.calculateTotalPrice();
      this.cartItemsService.updateCartItemsInLocalStorage(this.foods); // Update local storage with the new cart items
    }
}

updateFoodInLocalStorage(food: FoodCorner): void {
    this.cartService.getCartItems().subscribe((cartItems: FoodCorner[]) => {
      const cartItem = cartItems.find((item: FoodCorner) => item.id === food.id);
      if (cartItem) {
        cartItem.quantity = food.quantity;
        this.cartService.setCartItems(cartItems).subscribe(() => {
          this.cartItemsService.updateCartItemsInLocalStorage(cartItems);
        });
      }
    });
}


getFoodQuantity(foodId: string): number {
    const item = this.foods.find((food: FoodCorner) => food.id === foodId);
    return item ? item.quantity : 0;
}


calculateTotalPrice(): number {
  return this.foods.reduce((total, food) => total + (food.price * food.quantity), 0);
}


calculateProductPrice(food: FoodCorner): number {
    return food.price * this.getFoodQuantity(food.id);
}



continue(): void {
    this.router.navigate(['/home']);
}


  checkout(): void {
    this.cartService.sendCartItems(this.foods); // Send the cart items to the CheckoutDataService

    this.router.navigate(['/checkout']);
  }
}
