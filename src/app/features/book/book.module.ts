import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BookComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
})
export class BookModule { }
