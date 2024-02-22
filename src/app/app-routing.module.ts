import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './modules/shopping/shop/shop.component';
import { CartComponent } from './modules/cart/cart.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard],},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard],},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard],},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
