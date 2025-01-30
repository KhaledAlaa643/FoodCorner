import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { PopupComponent } from './popup/popup.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';

export const FOOD_CATEGORIES:string[] = ['*', 'burger', 'pizza', 'pasta', 'fries'];

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContactComponent,
    NotFoundComponent,
    PopupComponent,
    
  ],
  exports:[
    MatInputModule,
    MatPaginatorModule,
    ContactComponent,
    NotFoundComponent,
    PopupComponent,
    SharedModule
  ],
  providers:[{provide:'FoodCategories',useValue:FOOD_CATEGORIES}]
})
export class CoreModule {}
