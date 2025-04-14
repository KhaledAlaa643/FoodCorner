import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path:"",component:CheckoutComponent, canActivate:[AuthGuard]  },
];

export const CheckoutRoutes = RouterModule.forChild(routes);
