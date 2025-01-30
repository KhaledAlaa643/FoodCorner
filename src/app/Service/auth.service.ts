import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../Model/User';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue: BehaviorSubject<boolean>;
  
  private showModalSubject = new Subject<void>();
  showModal$ = this.showModalSubject.asObservable();
  
  
  constructor( private httpClient: HttpClient,
    private localStorageService:LocalstorageService
  ) {
    this.isLoggedInValue = new BehaviorSubject<boolean> (false)
  }
  login(email: string, password: string) {
    let userToken = "User Loggin"
    this.localStorageService.setItem("IsLoggin", userToken);
    this.isLoggedInValue.next(true)
  }
  signup(body:User):Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`,body)
  }
  logout(): void {
    this.localStorageService.removeItem("IsLoggin")
    this.isLoggedInValue.next(false)
  }

  get isLoggedIn(): boolean {
    return this.localStorageService.getItem("IsLoggin") ? true : false
  }
  userStatus() {
    return this.isLoggedInValue.asObservable()
  }

showLoginModal() {
  this.showModalSubject.next();
  }
}
