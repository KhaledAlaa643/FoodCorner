import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  { path:"profile",component:ProfileComponent  },
  { path:"settings",component:SettingComponent  },
];

export const AuthRoutes = RouterModule.forChild(routes);
