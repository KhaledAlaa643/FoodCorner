import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticAuthService {

constructor() { }
signup(body: User): Observable<User> {
  return of({ ...body, id: 1 });
}
}
