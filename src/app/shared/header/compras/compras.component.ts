import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cart } from 'src/app/modules/models/Cart.model';
import { User } from 'src/app/modules/models/User.model';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent {
  
  datosUsuario: User;
  comprasHoy: Cart[]; // Para almacenar las compras de hoy

  fecha: Date;

  compras: Cart[];

  constructor(private authService: AuthService) {

    this.authService.datosUsuario.subscribe(res => {
      this.datosUsuario = res;
      
    })

    this.compras = this.datosUsuario.compras.map(compra => {
      return {
        ...compra,
        fecha: new Date(compra.fecha.seconds * 1000) // Convertir a milisegundos
      };
    });

    this.filtrarComprasDeHoy();
  }


  private filtrarComprasDeHoy(): void {
    const hoy = new Date();
    const inicioDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const finalDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);

    this.comprasHoy = this.compras.filter(compra => {
      const fechaCompra = compra.fecha;
      return fechaCompra >= inicioDelDia && fechaCompra <= finalDelDia;
    });
  }


}
