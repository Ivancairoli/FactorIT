import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/models/User.model';
import { AuthService } from 'src/app/modules/services/auth.service';
import { ProductService } from 'src/app/modules/services/product.service';
import { ComprasComponent } from '../compras/compras.component';

@Component({
  selector: 'app-close-session',
  templateUrl: './close-session.component.html',
  styleUrls: ['./close-session.component.scss']
})
export class CloseSessionComponent {

  datosUsuario: User

  constructor(public dialogRef: MatDialogRef<CloseSessionComponent>, @Inject(MAT_DIALOG_DATA) public data: User, private authService: AuthService, private router: Router, private productSevice: ProductService, private matDialog: MatDialog ) { 
    this.authService.datosUsuario.subscribe(res => {
      this.datosUsuario = res;
    })
  }

  CerrarSesion(): void {
    this.authService.cerrarSesion();
    this.productSevice.deleteCart();
    this.router.navigateByUrl('login');  
  }

  compras(): void {
    this.matDialog.open(ComprasComponent, {width: '700px'})
  }
}
