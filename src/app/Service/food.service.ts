import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  url = environment.apiUrl;
constructor(private http: HttpClient){}

getFoodByID(id: string | null | number): Observable<FoodCorner> {
  return this.http.get<FoodCorner>(`${this.url}/food/${id}`)
  .pipe(
    catchError(error => throwError(() => new Error(`Failed to Load Food with ID: ${id}. Please try again later.`)))
  );;
}

fetchData<T>(endpoint?: string): Observable<T[]> {
  const data = endpoint ? `${this.url}/${endpoint}` : `${this.url}`;
  return this.http.get<T[]>(data).pipe(
    catchError(error => throwError(() => new Error(`Failed to fetch ${endpoint || 'data'}. Please try again later.`)))
  );
}
filterFoodsByCategory(foods: FoodCorner[], category: string): FoodCorner[] {
  if (!category || category === '*') {
    return foods;
  }
  return foods.filter(food => food.tag?.toString() === category);
}

toggleFavorite(food: FoodCorner): boolean {
  return food.favorite = !food.favorite;
}
}
