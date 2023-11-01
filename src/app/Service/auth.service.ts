import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInValue: BehaviorSubject<boolean>;
constructor( ) {
  this.isLoggedInValue = new BehaviorSubject<boolean> (false)
}
  login(email: string, password: string) {
    let userToken = "tokenTest"
    localStorage.setItem("token", userToken);
    this.isLoggedInValue.next(true)
  }

  logout(): void {
    localStorage.removeItem("token")
    this.isLoggedInValue.next(false)
  }

  get isLoggedIn(): boolean {
    return (localStorage.getItem("token")) ? true : false
  }
  userStatus() {
    return this.isLoggedInValue.asObservable()
  }
}
