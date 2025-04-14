import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutes } from './contact.routing';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    ReactiveFormsModule,
    ContactRoutes
  ],
})
export class ContactModule { }
