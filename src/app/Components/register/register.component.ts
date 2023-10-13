import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/Model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: User = {} as User

  constructor (    private location: Location,private router:Router
  ) { }

    onSubmit(form: any) {
    if (form.valid) {
      // Form is valid, you can submit the data or perform further actions here
      console.log('Form submitted!');
      console.log(form.value); // Access form values using form.value object
    } else {
      // Form is invalid, display validation errors
      console.log('Invalid form!');
      // You can also display validation errors by accessing form controls like form.controls['fullName'].errors
    }
  }
back(): void {
    this.location.back();
  }
  Register() {
      this.router.navigate(['/login']);
}
}
