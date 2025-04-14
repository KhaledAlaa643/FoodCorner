import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../../../core/services/localstorage.service';


@Injectable({
  providedIn: 'root'
})
// login, logout, signup, and status tracking
export class AuthService {
  private isLoggedInValue: BehaviorSubject<boolean>;
  constructor( private httpClient: HttpClient,
    private localStorageService:LocalstorageService
  ) {
    this.isLoggedInValue = new BehaviorSubject<boolean> (false)
  }
  login(email: string, password: string) {
    const userToken = "User Loggin"
    this.localStorageService.setItem("IsLoggin", userToken);
    this.isLoggedInValue.next(true)
  }
  logout(): void {
    this.localStorageService.removeItem("IsLoggin")
    this.isLoggedInValue.next(false)
  }
  signup(body:User):Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`,body)
  }

  get isLoggedIn(): boolean {
    return this.localStorageService.getItem("IsLoggin") ? true : false
  }
  userStatus() {
    return this.isLoggedInValue.asObservable()
  }

}
