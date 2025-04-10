import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConcertListComponent } from './components/concert-list/concert-list.component';
import { ConcertDetailComponent } from './components/concert-detail/concert-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'concerts',
    component: ConcertListComponent,
    title: 'Concerts'
  },
  {
    path: 'concert-detail',
    component: ConcertDetailComponent,
    title: 'Concert Details'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Your Cart'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout'
  },
  {
    path: 'confirmation',
    component: ConfirmationDialogComponent,
    title: 'Order Confirmation'
  },
  {
    path: 'signup',
    component: SignupComponent ,
    title: 'Signup'
  },
  {
    path: 'login',
    component: LoginComponent ,
    title: 'Login'
  },
  { 
    path: '**',
    redirectTo: 'home'
  }
];