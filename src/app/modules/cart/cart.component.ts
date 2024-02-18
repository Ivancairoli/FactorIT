import { Component, OnInit } from '@angular/core';
import { Product } from '../shopping/models/Product.model';
import { ProductService } from '../shopping/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  productsInCart: Product[] = [];
  total: number;
  product: Product | null;

  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router) {
    
  }

  ngOnInit(): void {
    this.productService.currentProducts.subscribe(products => {
      const consolidatedProducts: Product[] = products.reduce((acc: Product[], product) => {
        const existingProduct = acc.find(p => p.id === product.id);
        if (existingProduct) {
          existingProduct.selectedQuantity += product.selectedQuantity;
        } else {
          acc.push({...product});
        }
        return acc;
      }, [] as Product[]);
      this.productsInCart = consolidatedProducts;
      this.total = 0;
      this.productsInCart.forEach(product => {
        this.total += Number(product.price) * product.selectedQuantity;
      });
    });
  }

  //Esta función elimina directamente el carro
  deleteCart(): void {
    this.productService.deleteCart();
  }

  deleteElement(productToDelete: Product): void {
    this.productsInCart = this.productsInCart.filter(product => product.id !== productToDelete.id);
    this.recalculateTotal();
  }

  recalculateTotal(): void {
    this.total = 0;
    this.productsInCart.forEach(product => {
      this.total += Number(product.price) * product.selectedQuantity;
    });
  }

  buy(): void {
    this.dialog.open(BuyModalComponent, {width: '600px'});
    this.productService.deleteCart();
  }

  redirect(): void {
    this.router.navigateByUrl('/inicio')
  }

  
}
