import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache = new Map<string, Observable<unknown>>();

  get<T>(key: string): Observable<T[]> | undefined {
    return this.cache.get(key) as Observable<T[]> | undefined;
  }

  set<T>(key: string, value: Observable<T[]>): void {
    this.cache.set(key, value);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}
