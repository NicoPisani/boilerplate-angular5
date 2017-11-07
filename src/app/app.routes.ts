import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './providers/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Login' }
    },
    {
      path: 'register',
      component: RegisterComponent,
      data: { title: 'Register' }
    },
    {
      path: 'protected',
      component: ProtectedComponent,
      data: { title: 'Ruta Protegida' },
      canActivate: [AuthGuardService],
    },
    {
      path: '**',
      redirectTo: '/login'
    }
  ];
