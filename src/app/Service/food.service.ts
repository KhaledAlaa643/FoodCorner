import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

getFoodByID(id: string | null): Observable<FoodCorner> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<FoodCorner>(url).pipe(
    catchError((error: any) => {
      // Handle the error
      return throwError(error);
    })
  );
}
  getAll(): Observable<FoodCorner[]> {
    return this.http.get<FoodCorner[]>(`${this.apiUrl}/cart`)
  }

  getFoodIDs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?_fields=id`);
  }
}
