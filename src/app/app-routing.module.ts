import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './modules/shopping/shop/shop.component';
import { CartComponent } from './modules/cart/cart.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
