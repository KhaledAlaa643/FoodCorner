import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/Model/User';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {} as User
  hide = true;
  hidePw = true
  public registrationForm: FormGroup;
  @Output() showLoginSection = new EventEmitter<void>();

  constructor(private location: Location, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern
          (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)],
    ],
      passwordConfirm: [null, [Validators.required]],
    }
      , { validator: this.passwordMatchValidator }
    )}



passwordMatchValidator(control: AbstractControl): ValidationErrors | null  {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;
    if ((password === passwordConfirm) && (password !== null && passwordConfirm !== null)) {
      control.get('passwordConfirm')!.setErrors(null);
      return null;
    } else {
          control.get('passwordConfirm')!.setErrors({ passwordsNotMatching: true });
          return { passwordsNotMatching: true };
    }
  }

  openLoginSection() {
    this.showLoginSection.emit();
  }

back(): void {
    this.location.back();
  }

}
