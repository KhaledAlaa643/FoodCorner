import { InjectionToken } from "@angular/core";
import { FoodCorner } from "./Model/FoodCorner";

export const CART_ITEMS = new InjectionToken<[FoodCorner][]>("getCartItems",{
    providedIn: "root",
    factory: ()=> JSON.parse(localStorage.getItem('cartItems') || '[]')
  })