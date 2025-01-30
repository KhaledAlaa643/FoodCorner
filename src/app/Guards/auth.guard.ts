import { CanActivate  } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(){
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      alert("You Should Login First")
      this.authService.showLoginModal()
      return false;
    }
  }
}