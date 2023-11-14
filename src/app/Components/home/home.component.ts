import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { Special } from 'src/app/Model/Special';
import { Service } from 'src/app/Model/Service';
import { WhyUs } from 'src/app/Model/WhyUs';
import { Slider } from 'src/app/Model/Slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    animations: [
    trigger('fadeInOut', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
        height: '0',
        overflow: 'hidden',
      })),
      transition('show <=> hide', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit{
  food: FoodCorner = {} as FoodCorner;
  cartItems: FoodCorner[] = [];
  selectedCategory: string = "";
  foodsItems :FoodCorner[] = [];
  specialMenuItems :Special[] = []
  servicesItems :Service[] = []
  whyUsItems :WhyUs[]= [];
  sliderItems :Slider[] = [];
  filteredFoods: FoodCorner[] = this.foodsItems;
  showAllProducts: boolean = false;
  currFoodId!: string;
  isInCart= false  ;
  carts!: any
  isScrollbarEnabled = false;
  activeTabIndex: number = 0;

  constructor(
    private router: Router,
    private foodService: FoodService,
    private cartItemsService: CartItemsService,
  ) { }

  ngOnInit(): void {    
    // Foods
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodsItems = foods;
      this.filteredFoods = this.foodsItems;
    });
    // Special Food
    this.foodService.getAllSpecial().subscribe((special) => {
      this.specialMenuItems = special
    })
    // Our Services
    this.foodService.getAllServices().subscribe((service) => {
      this.servicesItems = service
    })
    // Why choose us
    this.foodService.getAllWhyUs().subscribe((whyus) => {
      this.whyUsItems = whyus
    })
    // Slider
    this.foodService.getAllSlider().subscribe((slider) => {
      this.sliderItems = slider
    })
    this.cartItemsService.loadCartItemsFromLocalStorage();
    this.cartItems = this.cartItemsService.cartItemsSubject.getValue();
    this.carts = this.cartItemsService.getCartItems();
    
  }
  filterFoodsByCategory(category: string | any) {
    this.selectedCategory = category;

    if (category === '*' || category === '') {
      this.filteredFoods = this.foodsItems;
    } else {
      this.filteredFoods = this.foodsItems.filter(food => food.tag === category);
    }
  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
  toggleScrollbar() {
    this.isScrollbarEnabled = !this.isScrollbarEnabled;
  }


openFoodDetails(food: FoodCorner): void {
  this.router.navigate(['/food', food.id], { state: { foodData: food, isItemInCart: this.isInCart } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

checkIfItemInCart(): any {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemIdToCheck = this.food.id || this.currFoodId; // Use either food.id or currFoodId
    const isItemInCart = savedCartItems.some((item: any) => item.id === itemIdToCheck && item.quantity > 0);
    
    this.isInCart = isItemInCart;
    console.log(isItemInCart);

  return isItemInCart;
}

  isInCartItem(food: any): boolean {  
  return this.cartItems.some(item => item.id === food.id);
}

addToCart(food: any): void {
  
  const isItemInCart = this.cartItemsService.id(food.id);
  console.log("is item in cart ? " + isItemInCart);
  
  if (isItemInCart) {
    console.log("Item is already in the cart");
  } else {
    this.cartItemsService.addToCart(food);

    const currentCartItems = this.cartItemsService.cartItemsSubject.getValue();
    // Update the cartItems array 
    this.cartItems = currentCartItems;

    this.saveItemsToLocalStorage(currentCartItems);
    this.cartItemsService.removeLastItemFromCart();


    console.log("Item added to the cart");
  }

  
}

saveItemsToLocalStorage(cartItems: any[]): void {
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  if (!savedCartItems.some((item: any) => item.id === this.currFoodId && item.quantity > 0)) {
    savedCartItems.push({
      id: this.currFoodId,
      name: this.food.name,
      cookTime: this.food.cookTime,
      price: this.food.price,
      quantity: this.food.quantity,
      imageURL: this.food.imageURL,
    }); // Add the item to the cart in the local storage

    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(savedCartItems));

    // Update the isItemInCart flag and save it in local storage
    localStorage.setItem('isItemInCart', 'true');
  } else {
    // If the item is already in the cart, set isItemInCart to false and remove it from local storage
    localStorage.setItem('isItemInCart', 'false');

    // Handle removing the item from the cartItems array in local storage if needed
    // (remove the logic to remove the item from cartItems if not needed)
    const updatedCartItems = savedCartItems.filter((item: any) => item.id !== this.currFoodId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
}


toggleShowAllProducts() {
    this.showAllProducts = !this.showAllProducts;
  }
  toggleLike(food: any): void {
    food.favorite = !food.favorite;
  }

  getStarsArray(stars: number): any{
    const fullStars = Math.floor(stars); // Number of full stars
    const hasHalfStar = stars % 1 !== 0; // Check if there is a half star

    if (hasHalfStar) {
      // Add half star if present
      return Array(fullStars).fill(0).concat(0.5);
    } else {
      // Only full stars
      return Array(fullStars).fill(0);
    }
  }


}
