import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartStatusService } from 'src/app/Service/cart-status.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
export class HomeComponent implements OnInit{
  foods: FoodCorner[] = [];
  selectedCategory: string = "";
  filteredFoods: FoodCorner[] = [];
  isItemInCart!: boolean;
  showAllProducts: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  dataSource = new MatTableDataSource<FoodCorner>([]); // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private foodService: FoodService,
      private cartStatus: CartStatusService
  ) { }


  ngOnInit(): void {
    
    this.foodService.getAll().subscribe((foods: FoodCorner[]) => {
      console.log('Received data:', foods);
      this.foods = foods;
      this.filteredFoods = this.foods;
      this.dataSource.data = this.foods;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  this.isItemInCart = this.cartStatus.getCartStatus();
  }
  filterFoodsByCategory(category: string | any) {
    this.selectedCategory = category; 

    if (category === '*' || category === '') {
      this.filteredFoods = this.foods; 
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
// toggleShowAllProducts() {
//     this.showAllProducts = !this.showAllProducts;
//   }
// getPaginatedFoods() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.foods.slice(startIndex, startIndex + this.itemsPerPage);
//   }
// prevPage() {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//   }
// }

// nextPage() {
//   if (this.currentPage * this.itemsPerPage < this.foods.length) {
//     this.currentPage++;
//   }
// }