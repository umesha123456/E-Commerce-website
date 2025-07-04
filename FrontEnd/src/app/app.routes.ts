import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { AdminComponent } from './admin/admin.component'; // Create this component
// import { LoginComponent } from './login/login.component'; // Create this component
import { AuthGuard } from './core/services/guards/auth.guard'; // Adjust path if needed
import { AdminGuard } from './core/services/guards/admin.guard'; // Adjust path if needed


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  {
    path: 'PaymentSuccess',
    component: PaymentSuccessComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];

