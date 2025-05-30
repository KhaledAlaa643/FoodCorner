import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/features/foods/models/FoodCorner';
import { CartItemsService } from 'src/app/features/cart/services/cart-items.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  foods: FoodCorner[] = [];
  price: number = 0;
  subtotal = 0;
  productPrice = 0
  currentPage: number = 1;
  itemsPerPage: number = 3;
  public messageForm: FormGroup;
  constructor(
    private cartItemsService: CartItemsService,
    private router: Router,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef

  ) {
    this.messageForm = this.fb.group({
      msg: ['', [Validators.required]],
    })
  
  }
ngOnInit(): void {
  this.cartItemsService.loadCartItems()  
  const cartItemsSubscription = this.cartItemsService.cartItems$.subscribe((cartItems) => {
    this.foods = cartItems
    this.updatePrices()
  });
  this.destroyRef.onDestroy( () => cartItemsSubscription.unsubscribe())
}


removeFromCart(food: FoodCorner): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartItemsService.removeFromCart(food);      
      this.cdr.detectChanges();
      Swal.fire({
        title: "Deleted!",
        text: "Your food has been deleted.",
        icon: "success"
      });
    }
  });
}


increaseQuantity(food: FoodCorner): void {
  this.cartItemsService.increaseQuantity(food)
  this.updatePrices()
}


decreaseQuantity(food: FoodCorner): void {
  this.cartItemsService.decreaseQuantity(food)
  this.updatePrices()
}


getFoodQuantity(foodId: string): number {
  const item = this.foods.find((food: FoodCorner) => food.id === foodId);  
  return item ?  item.quantity : 0;
}


updatePrices(): void{
  this.updateProductsPrice()
  this.subtotal = this.calculateTotalPrice()
}


updateProductsPrice(): void {
  this.foods.forEach(food => food.productPrice = food.quantity * food.price);
}


calculateTotalPrice(): number {  
  return this.foods.reduce((total, food) => total + (food.price * food.quantity), 0);
}


calculateProductPrice(food: FoodCorner): number {
  this.productPrice = food.price * this.getFoodQuantity(food.id);
  return this.productPrice
} 


goToHome(): void {
  this.router.navigate(['/home']);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


checkout(): void {
  this.router.navigate(['/checkout']);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


saveMessage() {
  if (this.messageForm.invalid) {
    return;
  }
  Swal.fire({
  position: "center",
  icon: "success",
  title: "Your Note has been saved",
  showConfirmButton: false,
  timer: 1500
  });
}
}
