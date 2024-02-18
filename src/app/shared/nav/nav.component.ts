import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProductService } from 'src/app/modules/shopping/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  mostrarComponente = false;
  value: string = '';

  constructor(private router: Router, private productService: ProductService) { 
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarComponente = event.url.includes('/cart') || event.url.includes('/login');
    });
  }

  onCambioTexto(valor: string) {
    this.productService.cambiarFiltroTexto(valor);
  }

  alert(){
    alert("Sin Finalizar")
  }

}
