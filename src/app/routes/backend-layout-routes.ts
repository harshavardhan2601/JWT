import { Routes } from '@angular/router';
import { ProfileComponent } from '../dashboard/profile/profile.component';
import { AuthGuard } from '../auth/services/auth.guard';

export const BACKEND_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate: [AuthGuard]
    }

]