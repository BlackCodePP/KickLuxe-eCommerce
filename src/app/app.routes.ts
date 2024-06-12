import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
    { path: 'panel', component: UserPageComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' } 
];

