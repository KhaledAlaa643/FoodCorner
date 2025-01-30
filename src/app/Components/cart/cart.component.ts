import { Component, DestroyRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FoodService } from 'src/app/Service/food.service';
import { AuthService } from 'src/app/Service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  foods: FoodCorner[] = [];
  price: number = 0;
  
  @Input() totalCartItems: number = 0;
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  dataSource = new MatTableDataSource<FoodCorner>([]); 
  currentPage: number = 1;
  itemsPerPage: number = 3;
  carts!: any
  public messageForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartItemsService: CartItemsService,
    private foodService:FoodService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef

  ) {
    this.messageForm = this.fb.group({
      msg: ['', [Validators.required]],
    })
  
  }

ngOnInit(): void {
  const cartItemsSubscription = this.cartItemsService.cartItems$.subscribe((cartItems) => {
    this.foods = cartItems;
    this.calculateTotalPrice();
  });
    
    this.carts = this.foodService.fetchData<FoodCorner>();
    this.dataSource.data = this.foods;
    this.destroyRef.onDestroy(()=>{
      cartItemsSubscription.unsubscribe()
    })

}
onInput(event: any) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9]/g, ''); 
}
removeFromCart(food: FoodCorner): void {
  this.cartItemsService.removeFromCart(food);
  const index = this.foods.indexOf(food);
  if (index > -1) {
    this.foods.splice(index, 1);
    this.calculateTotalPrice();
    this.cartItemsService.notifyItemRemoved();
    window.location.reload();
  }
}

loadCartItemsFromLocalStorage(): void {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemsService.updateCartItems(savedCartItems);
  }

increaseQuantity(food: FoodCorner): void {
    if (food.quantity < 100) {
      food.quantity++;
      this.calculateTotalPrice();
      this.cartItemsService.updateCartItemsInLocalStorage(this.foods);
    }
}


decreaseQuantity(food: FoodCorner): void {
  if (food.quantity > 1) {
    food.quantity--;
      this.calculateTotalPrice();
      this.cartItemsService.updateCartItemsInLocalStorage(this.foods);
    }
}

updateFoodInLocalStorage(food: FoodCorner): void {
    this.foodService.fetchData<FoodCorner>().subscribe((cartItems: FoodCorner[]) => {
      const cartItem = cartItems.find((item: FoodCorner) => item.id === food.id);
      if (cartItem) {
        cartItem.quantity = food.quantity;
      this.cartItemsService.setCartItems(cartItems).subscribe(() => {
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
  this.totalCartItems = this.foods.reduce((total, food) => total + (food.price * food.quantity), 0);
  return this.totalCartItems
}
calculateProductPrice(food: FoodCorner): number {
    return food.price * this.getFoodQuantity(food.id);
}

continue(): void {
  this.router.navigate(['/home']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
  checkout(): void {
    var x = this.authService.isLoggedIn
    console.log(x);
    
    this.cartItemsService.sendCartItems(this.foods);
    this.router.navigate(['/checkout']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  save() {
    Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Note has been saved",
    showConfirmButton: false,
    timer: 1500
    });
  }
}
