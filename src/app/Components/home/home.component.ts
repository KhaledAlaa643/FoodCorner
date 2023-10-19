import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartStatusService } from 'src/app/Service/cart-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', animate(500)),
    ]),
  ],
})
export class HomeComponent {
  foods: FoodCorner[] = [];
  selectedCategory: string = "";
  filteredFoods: FoodCorner[] = [];
  isItemInCart!: boolean;
  showAllProducts: boolean = false;

  constructor(private router: Router, private foodService: FoodService,
      private cartStatus: CartStatusService
  ) { }
  
toggleShowAllProducts() {
    this.showAllProducts = !this.showAllProducts;
  }
  ngOnInit(): void {
    this.foodService.getAll().subscribe((foods: FoodCorner[]) => {
      this.foods = foods;
      this.filteredFoods = this.foods;
    });
      this.isItemInCart = this.cartStatus.getCartStatus(); // Get the cart status from the CartStatusService

  }
    // Function to filter foods based on the selected category
  filterFoodsByCategory(category: string | any) {
    this.selectedCategory = category; // Update the selected category

    if (category === '*' || category === '') {
      this.filteredFoods = this.foods; // Show all foods if 'All' is selected or category is empty
    } else {
      this.filteredFoods = this.foods.filter(food => food.tag === category);
    }
  }
openFoodDetails(food: FoodCorner): void {
  this.router.navigate(['/food', food.id], { state: { foodData: food, isItemInCart: this.isItemInCart } });
}
onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filteredFoods = this.foods.filter((food) => {
      if (category === 'all') {
        return true;
      } else {
        return food.tag && food.tag.includes(category);
      }
    });
  }

  toggleLike(food: FoodCorner): void {
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

