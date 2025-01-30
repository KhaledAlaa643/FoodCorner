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
  cartItems: FoodCorner[] = [];

constructor(private http: HttpClient){}

getFoodByID(id: string | null | number): Observable<FoodCorner> {
  const url = environment.apiUrl;
  return this.http.get<FoodCorner>(`${url}/food/${id}`);
}

private handleError(operation: string) {
  return (error: any): Observable<never> => {
    console.error(`Error during ${operation}:`, error);
    return throwError(() => new Error(`Error during ${operation}. Please try again later.`));
  };
}

fetchData<T>(endpoint?:string): Observable<T[]> {
  const url = endpoint ? `${environment.apiUrl}/${endpoint}` : `${environment.apiUrl}`;
  return this.http.get<T[]>(`${url}`).pipe(catchError(this.handleError("error")));
}

}
