import { Component, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/services/auth.service';
import { ProductService } from 'src/app/modules/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  mostrarComponente = false;
  value: string = '';
  inicioSesion: boolean = false;

  constructor(private router: Router, private productService: ProductService, private authService: AuthService) { 
    
    this.authService.sesionIniciada.subscribe((res) => {
      this.inicioSesion = res;
    });

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarComponente = event.url.includes('/cart') || event.url.includes('/login');
    });
  }

  ngOnInit(): void {

  }

  onCambioTexto(valor: string) {
    this.productService.cambiarFiltroTexto(valor);
  }

  alert(){
    alert("Sin Finalizar")
  }

}
