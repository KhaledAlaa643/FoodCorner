import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {} as User
  public jobForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }


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
  login() {
    this.router.navigate(['/home']);
}
}
