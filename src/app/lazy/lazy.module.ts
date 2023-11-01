import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { TrackOrderComponent } from '../Components/track-order/track-order.component';


@NgModule({
  declarations: [
    TrackOrderComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
