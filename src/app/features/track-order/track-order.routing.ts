import { Routes, RouterModule } from '@angular/router';
import { TrackOrderComponent } from './track-order.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {  path:"",component:TrackOrderComponent,canActivate:[AuthGuard] },
];

export const TrackOrderRoutes = RouterModule.forChild(routes);
