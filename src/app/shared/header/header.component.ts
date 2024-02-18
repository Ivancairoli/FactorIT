import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/shopping/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  counter: number = 0;

  constructor(private router: Router, private productService: ProductService) { 
    productService.currentProducts.subscribe(res => {
      this.counter = res.length
    })
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

}
