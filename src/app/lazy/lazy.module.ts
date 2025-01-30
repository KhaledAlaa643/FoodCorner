import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { TrackOrderComponent } from '../Components/track-order/track-order.component';
import { ProfileComponent } from '../core/profile/profile.component';
import { SettingComponent } from '../Components/setting/setting.component';


@NgModule({
  declarations: [
    TrackOrderComponent,
    ProfileComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
