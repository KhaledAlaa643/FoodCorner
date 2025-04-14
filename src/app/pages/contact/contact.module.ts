import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    ReactiveFormsModule
  ],
})
export class ContactModule { }
