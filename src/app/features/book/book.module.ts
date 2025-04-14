import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutes } from './book.routing';



@NgModule({
  declarations: [BookComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BookRoutes
  ],
})
export class BookModule { }
