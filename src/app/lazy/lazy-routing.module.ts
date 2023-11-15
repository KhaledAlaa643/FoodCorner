import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackOrderComponent } from '../Components/track-order/track-order.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { SettingComponent } from '../Components/setting/setting.component';
import { AuthGuard } from '../Guards/auth.guard';

const routes: Routes = [
  {path: '', component: TrackOrderComponent,canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent},
  {path: 'setting', component: SettingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
