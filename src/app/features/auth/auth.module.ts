import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ValidationsService } from './services/validations.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthUiModule } from './auth-ui.module';


@NgModule({
  imports: [
    AuthUiModule
  ],
  providers:[
    AuthService,
    ValidationsService
  ]
})
export class AuthModule { }
