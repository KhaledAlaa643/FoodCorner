import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackOrderComponent } from '../Components/track-order/track-order.component';

const routes: Routes = [
  {path: '', component: TrackOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
