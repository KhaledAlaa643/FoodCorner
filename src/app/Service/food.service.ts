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
constructor(private http: HttpClient){}

getFoodByID(id: string | null | number): Observable<FoodCorner> {
  const url = environment.apiUrl;
  return this.http.get<FoodCorner>(`${url}/food/${id}`);
}

fetchData<T>(endpoint?: string): Observable<T[]> {
  const url = endpoint ? `${environment.apiUrl}/${endpoint}` : `${environment.apiUrl}`;
  return this.http.get<T[]>(url).pipe(
    catchError(error => throwError(() => new Error(`Failed to fetch ${endpoint || 'data'}. Please try again later.`)))
  );
}
filterFoodsByCategory(foods: FoodCorner[], category: string): FoodCorner[] {
  if (!category || category === '*') {
    return foods;
  }
  return foods.filter(food => food.tag?.toString() === category);
}

toggleFavorite(food: FoodCorner): void {
  food.favorite = !food.favorite;
}
}
