import { NgModule } from '@angular/core';
import { PopupComponent } from './components/popup/popup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';


@NgModule({
  declarations: [PopupComponent,ProfileComponent,RegisterComponent,SettingComponent],
  exports:[PopupComponent],
  imports:[MatFormFieldModule,FormsModule,ReactiveFormsModule,CommonModule,AuthRoutes
  ]
})
export class AuthUiModule { }
