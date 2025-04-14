import { NgModule } from '@angular/core';
import { StarsPipe } from './pipes/stars.pipe';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthUiModule } from '../features/auth/auth-ui.module';
import { RouterLink } from '@angular/router';

const data =  [
  StarsPipe,
  HeaderComponent,
  FooterComponent,
]
@NgModule({
  declarations: data,
  exports: data,
  imports:[CommonModule,ReactiveFormsModule,AuthUiModule,RouterLink]
})
export class SharedModule { }
