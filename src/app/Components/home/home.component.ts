import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartStatusService } from 'src/app/Service/cart-status.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { CartService } from 'src/app/Service/cart.service';

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
  food: FoodCorner = {} as FoodCorner;
  cartItems: any[] = [];
  selectedCategory: string = "";
  // filteredFoods: FoodCorner[] = [];
  foodsStatic = [

{

  
    
      id: "1",
      name: "Pizza pepproni",
      cookTime: "10-20",
      price: 15,
      quantity: 1,
      favorite: false,
      origin: "italy",
      stars: 3.5,
      imageURL: "Images/pepproni.png",
      tag: "Pizza",
      description: "Pepperoni is an American variety of spicy salami made from cured pork and beef seasoned with paprika or other chili pepper."
    },
    {
      id: "2",
      name: "Margherita Pizza ",
      cookTime: "10-20",
      price: 10,
      quantity: 1,
      favorite: false,
      origin: "italy",
      stars: 4.5,
      imageURL: "Images/margreta.png",
      tag: "pizza",
      description: "margherita pizza features a bubbly crust, crushed San Marzano tomato sauce, fresh mozzarella and basil, a drizzle of olive oil, and a sprinkle"
    },
    {
      id: "3",
      name: "Seafood Pizza ",
      cookTime: "10-20",
      price: 10,
      quantity: 1,
      favorite: false,
      origin: "italy",
      stars: 4.5,
      imageURL: "Images/f1.png",
      tag: "pizza",
      description: "Seafood pizza is pizza prepared with seafood as a primary ingredient. Many types of seafood ingredients in fresh, frozen or canned forms may be used on seafood pizza."
    },
    {
      id: "4",
      name: "Beef Pepperoni Pizza",
      cookTime: "10-20",
      price: 10,
      quantity: 1,
      favorite: false,
      origin: "italy",
      stars: 3.5,
      imageURL: "Images/pngwing.com (7).png",
      tag: "pizza",
      description: "Beef Pepperoni Pizza. Stone-baked pizza crust topped with robust sauce, mozzarella cheese, and beef pepperoni slices."
    },
    {
      id: "5",
      name: "Cheese Burger ",
      cookTime: "15-25",
      price: 30,
      quantity: 1,
      favorite: false,
      origin: "italy",
      stars: 4,
      imageURL: "Images/cheese.png",
      tag: "burger",
      description: "A cheeseburger is a hamburger with a slice of melted cheese on top of the meat patty, added near the end of the cooking time."
    },
    {
      id: "6",
      name: "Chicken Burger ",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/chicken.png",
      tag: "burger",
      description: "A chicken sandwich is a sandwich that typically consists of boneless, skinless chicken breast or thigh served between slices of bread, on a bun, or on a roll."
    },
    {
      id: "7",
      name: "Double Cheese Burger ",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/double.png",
      tag: "burger",
      description: "Double Cheeseburger. Two charbroiled all-beef patties topped with American Cheese, dill pickles, diced onions, ketchup, and mustard on a se,eded bun."
    },
    {
      id: "8",
      name: "Double Chicken Burger ",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/double-chicken.png",
      tag: "burger",
      description: "The Double Chicken Cheese is made up of two tender chicken patties and a slice of cheese topped with the right amount of mustard, a touch of ketchup."
    },
    {
      id: "9",
      name: "Triple Cheese Burger ",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/triple.png",
      tag: "burger",
      description: "Triple Cheeseburger. Two charbroiled all-beef patties topped with American Cheese, dill pickles, diced onions, ketchup, and mustard on a seeded bun."
    },
    {
      id: "10",
      name: "Vegetable Spaghetti ",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/pasta1.png",
      tag: "pasta",
      description: "Vegetable Spaghetti is a simple mix of zucchini, mushrooms, spinach and tomatoes tossed together with pasta for a healthy pasta dish that tastes amazing."
    },
    {
      id: "11",
      name: "Chicken Pasta",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "England",
      stars: 4.5,
      imageURL: "Images/pasta2.png",
      tag: "pasta",
      description: "Chicken pasta in a garlic tomato cream sauce is the ultimate comfort meal. Made with pasta, chicken, spinach, seasonings, lots of yummy garlic, and parmesan cheese."
    },
    {
      id: "12",
      name: "French fries",
      cookTime: "15-25",
      price: 25,
      quantity: 1,
      favorite: false,
      origin: "France",
      stars: 5,
      imageURL: "Images/fries.png",
      tag: "fries",
      description: "French fries, chips, finger chips, french-fried potatoes, or simply fries, are batonnet or allumette-cut deep-fried potatoes of disputed origin from Belgium or France."
    }
  



  ];
    filteredFoods: any[] = this.foodsStatic;

  showAllProducts: boolean = false;
  sub!: Subscription;
  currFoodId!: string;
  isInCart= false  ;
carts!: any


  constructor(
    private router: Router,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private cartItemsService: CartItemsService,
    private CartService: CartService

  ) { }


  ngOnInit(): void {
    
    this.foodService.getAll().subscribe((foods) => {
      console.log('Received data:', foods);
      this.foods = foods;
      // this.filteredFoods = this.foods;
      
    });

    this.CartService.loadCartItemsFromLocalStorage();
    this.cartItems = this.cartItemsService.cartItemsSubject.getValue();
    // this.carts = this.CartService.getCartItems();
    // console.log(this.carts);
    
  }
  // filterFoodsByCategory(category: string | any) {
  //   this.selectedCategory = category;

  //   if (category === '*' || category === '') {
  //     this.filteredFoods = this.foods;
  //   } else {
  //     this.filteredFoods = this.foods.filter(food => food.tag === category);
  //   }
  // }
  

  // Method to filter foods based on category
  filterFoodsByCategory(category: string | any) {
    this.selectedCategory = category;

    if (category === '*' || category === '') {
      this.filteredFoods = this.foodsStatic;
    } else {
      this.filteredFoods = this.foodsStatic.filter(food => food.tag === category);
    }
  }

openFoodDetails(food: any): void {
  this.router.navigate(['/food', food.id], { state: { foodData: food, isItemInCart: this.isInCart } });
}
// onCategoryChange(category: string): void {
//     this.selectedCategory = category;
//     this.filteredFoods = this.foodsStatic.filter((food) => {
//       if (category === 'all') {
//         return true;
//       } else {
//         return food.tag && food.tag.includes(category);
//       }
//   });

//     this.sub = this.activatedRoute.params.subscribe((params) => {
//     this.currFoodId = params['id'];
//     this.food = history.state.foodData

//     this.checkIfItemInCart();

//   });
// }
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