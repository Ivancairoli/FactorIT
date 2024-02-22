import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/models/User.model';
import { AuthService } from 'src/app/modules/services/auth.service';
import { ProductService } from 'src/app/modules/services/product.service';
import { CloseSessionComponent } from './close-session/close-session.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscriptionCounter: Subscription;
  subscriptionUser: Subscription;
  counter: number = 0;
  user: User[];
  inicioSesion: boolean = false;
  userInfo: User;

  constructor(private router: Router, private productService: ProductService, private authService: AuthService, private matDialog: MatDialog) { 
    this.subscriptionCounter = productService.currentProducts.subscribe(res => {
      const uniqueIds = new Set();
      res.forEach(product => uniqueIds.add(product.id));
      this.counter = uniqueIds.size;
    })
  }

  ngOnInit(): void {

    this.subscriptionUser = this.authService.sesionIniciada.subscribe((res) => {
      this.inicioSesion = res;
      if(this.inicioSesion){
        this.authService.datosUsuario.subscribe(res => {
          if(!res) return;
          this.userInfo = res;
        })
      }
    });

  }

  ngOnDestroy(): void {
    this.subscriptionCounter.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }

  redirectTo(url: string): void {
    switch(url){
      case 'cart':
        this.router.navigateByUrl("/cart");
        break;
      case 'login':
        this.router.navigateByUrl('/login')
        break;
      case '':
        this.router.navigateByUrl('')
        break;
      default: ''
    }
  }

  openDialogCloseSession() : void {
    this.matDialog.open(CloseSessionComponent);
  }

}
