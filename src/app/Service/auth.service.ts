import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInValue = false;
  private user = { firstName: '' }; // Store user information here

login(email: string, password: string): boolean {
    // Add your login logic here and set isLoggedInValue and user info upon successful login
    // For simplicity, let's assume successful login and store the user's first name
    this.isLoggedInValue = true;
    this.user.firstName = 'Khaled'; // Replace 'Khaled' with the actual first name from the server
    return this.isLoggedInValue;
  }

  logout(): void {
    // Add your logout logic here
    this.isLoggedInValue = false;
    this.user.firstName = '';
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  get userFirstName(): string {
    return this.user.firstName;
  }}
