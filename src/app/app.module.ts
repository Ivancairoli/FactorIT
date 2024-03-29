import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './modules/cart/cart.component';

import { DataViewModule } from 'primeng/dataview';
import { LoginComponent } from './modules/login/login.component';
import { AddToCartComponent } from './modules/shopping/modals/add-to-cart/add-to-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopComponent } from './modules/shopping/shop/shop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { BuyModalComponent } from './modules/cart/buy-modal/buy-modal.component';
import { CalendarModule } from 'primeng/calendar';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { CloseSessionComponent } from './shared/header/close-session/close-session.component';
import { ComprasComponent } from './shared/header/compras/compras.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShopComponent,
    CartComponent,
    LoginComponent,
    AddToCartComponent,
    BuyModalComponent,
    CloseSessionComponent,
    ComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DataViewModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    InputNumberModule,
    CalendarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [AngularFireModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
