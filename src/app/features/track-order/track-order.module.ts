import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackOrderComponent } from './track-order.component';
import { TrackOrderRoutes } from './track-order.routing';



@NgModule({
  declarations: [TrackOrderComponent],
  imports:[CommonModule,TrackOrderRoutes],
})
export class TrackOrderModule { }
