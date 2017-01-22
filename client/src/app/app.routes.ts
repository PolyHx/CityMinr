import { AuthenticatedGuard } from './utils/authenticated.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';



export const ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard] },
    { path: 'login', component: LoginComponent },

    // Handle all other routes
    { path: '**', component: DashboardComponent, canActivate: [AuthenticatedGuard] }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
