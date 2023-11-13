import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'owl.carousel';
import { Subscription } from 'rxjs';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { CartService } from 'src/app/Service/cart.service';

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
        origin: "Italy",
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
        origin: "Portugal",
        stars: 4.5,
        imageURL: "Images/f1.png",
        tag: "pizza",
        description: "Seafood pizza is pizza prepared with seafood as a primary ingredient. Many types of seafood ingredients in fresh, frozen or canned forms."
      },
      {
        id: "4",
        name: "Beef Pepperoni Pizza",
        cookTime: "10-20",
        price: 10,
        quantity: 1,
        favorite: false,
        origin: "France",
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
        origin: "Italy",
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
        origin: "Spain",
        stars: 4.5,
        imageURL: "Images/chicken.png",
        tag: "burger",
        description: "A chicken sandwich is a sandwich that typically consists of boneless, skinless chicken breast or thigh served between slices of bread."
      },
      {
        id: "7",
        name: "Double Cheese Burger ",
        cookTime: "15-25",
        price: 25,
        quantity: 1,
        favorite: false,
        origin: "USA",
        stars: 4.5,
        imageURL: "Images/double.png",
        tag: "burger",
        description: "Double Cheeseburger. Two charbroiled all-beef patties topped with American Cheese, dill pickles, diced onions, ketchup, and mustard."
      },
      {
        id: "8",
        name: "Double Chicken Burger ",
        cookTime: "15-25",
        price: 25,
        quantity: 1,
        favorite: false,
        origin: "USA",
        stars: 4.5,
        imageURL: "Images/double-chicken.png",
        tag: "burger",
        description: "The Double Chicken Cheese is made up of two tender chicken patties and a slice of cheese topped with the right amount of mustard."
      },
      {
        id: "9",
        name: "Triple Cheese Burger ",
        cookTime: "15-25",
        price: 25,
        quantity: 1,
        favorite: false,
        origin: "Netherland",
        stars: 4.5,
        imageURL: "Images/triple.png",
        tag: "burger",
        description: "Triple Cheeseburger. Two charbroiled all-beef patties topped with American Cheese, dill pickles, diced onions, ketchup, and mustard."
      },
      {
        id: "10",
        name: "Vegetable Spaghetti ",
        cookTime: "15-25",
        price: 25,
        quantity: 1,
        favorite: false,
        origin: "Germany",
        stars: 4.5,
        imageURL: "Images/pasta1.png",
        tag: "pasta",
        description: "Vegetable Spaghetti is a simple mix of zucchini, mushrooms, spinach and tomatoes tossed together with pasta for a healthy pasta."
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
        description: "Chicken pasta in a garlic tomato cream sauce is the ultimate comfort meal. Made with pasta, chicken, seasonings, and parmesan cheese."
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
        description: "French fries, french-fried potatoes, are batonnet or allumette-cut deep-fried potatoes of disputed origin from Belgium or France."
      }
    



    ];
    specialMenuItems = [
    {
      name: 'Burger',
      description: 'Delicious burger with juicy patty, fresh vegetables, and special sauce.',
      image: '../../../assets/Images/special-burger.jpg'
    },
    {
      name: 'ITALIAN PIZZA',
      description: 'Indulge in the authentic flavors of Italy with our Italian Pizza. Crafted with a thin and crispy crust, our pizza is topped with the finest Italian tomatoes, fresh mozzarella cheese, aromatic basil, and a drizzle of extra virgin olive oil. Each bite is a journey to the heart of Italy, bringing you the perfect combination of simplicity and exquisite taste.',
      image: '../../../assets/Images/special-menu-2.jpg'
    },
    {
      name: 'Pasta',
      description: 'Savory pasta with a rich and flavorful tomato sauce, topped with Parmesan cheese.',
      image: '../../../assets/Images/pasta-special.jpg'
    },
    {
      name: 'Classic Burger',
      description: 'A classic burger with a juicy beef patty, fresh lettuce, tomatoes, and special sauce.',
      image: '../../../assets/Images/burger-classic.jpg'
    },
    {
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti pasta with a rich Bolognese sauce made from ground beef, tomatoes, and herbs.',
      image: '../../../assets/Images/spagetti-special.jpg'
    }
    ];
    services = [
    {
      iconClass: 'fa fa-3x fa-user-tie text-warning mb-4',
      title: 'Master Chefs',
      description: 'Our master chefs bring years of culinary expertise to create exquisite dishes for your enjoyment.'
    },
    {
      iconClass: 'fa fa-3x fa-utensils text-warning mb-4',
      title: 'Quality Food',
      description: 'Experience the finest quality food prepared with the freshest ingredients, ensuring a delightful dining experience.'
    },
    {
      iconClass: 'fa fa-3x fa-cart-plus text-warning mb-4',
      title: 'Online Order',
      description: 'Conveniently order your favorite dishes online and have them delivered to your doorstep in no time.'
    },
    {
      iconClass: 'fa fa-3x fa-headset text-warning mb-4',
      title: '24/7 Service',
      description: 'Enjoy our dedicated 24/7 service, ensuring that you receive assistance and support whenever you need it.'
    }
    ];
    whyUsItems = [
    {
      number: '01',
      title: 'Fresh and Delectable Dishes',
      description: 'Indulge in the finest culinary delights prepared by our skilled chefs using only the freshest ingredients. From mouthwatering appetizers to sumptuous main courses and delectable desserts, every dish is a masterpiece that delights your taste buds.'
    },
    {
      number: '02',
      title: 'Impeccable Service',
      description: 'At Our Restaurant, we prioritize your comfort and satisfaction. Our courteous and attentive staff is dedicated to making your dining experience memorable. From the moment you step in until you leave, we ensure you receive top-notch service that exceeds your expectations.'
    },
    {
      number: '03',
      title: 'Charming Ambience',
      description: 'Step into an enchanting atmosphere that combines elegance with a warm, welcoming vibe. Whether you\'re dining with family, friends, or having a romantic evening, our restaurant\'s cozy ambiance sets the perfect mood for every occasion.'
    },
    {
      number: '04',
      title: 'Providing Ambience',
      description: 'At Our Restaurant, we take immense pride in consistently delivering an extraordinary dining experience that captivates our cherished customers. There are numerous compelling reasons why you should wholeheartedly choose us to savor culinary delights beyond compare.'
    }
    ];
    sliderItems = [
      {
        imagePath: '../../../assets/Images/slider1.jpg',
        alt: 'Burger',
        caption: 'Delicious burgers to satisfy your cravings.'
      },
      {
        imagePath: '../../../assets/Images/slider2.jpg',
        alt: 'Pizza',
        caption: 'Mouthwatering pizzas for a perfect meal.'
      },
      {
        imagePath: '../../../assets/Images/slider3.jpg',
        alt: 'Pasta',
        caption: 'Savory pasta dishes made just the way you like.'
      }
      // Add more items as needed
    ];
    filteredFoods: any[] = this.foodsStatic;

  
  showAllProducts: boolean = false;
  sub!: Subscription;
  currFoodId!: string;
  isInCart= false  ;
  carts!: any
  isScrollbarEnabled = false;
  activeTabIndex: number = 0;

  customHeight!: number;

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


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
  toggleScrollbar() {
    this.isScrollbarEnabled = !this.isScrollbarEnabled;
  }
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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