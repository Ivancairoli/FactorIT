import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartComponent } from '../modals/add-to-cart/add-to-cart.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

    layout: string = 'list';
    getProducts: Subscription;
    filteredProducts: Product[] = [];
    products!: Product[];
    filtroTexto: string = '';

    constructor(private productService: ProductService, private dialog: MatDialog, private authService: AuthService) {
        this.getProducts = this.productService.getProducts().subscribe(res => {
            this.products = res.slice(0, 10)
        })
    }

    ngOnInit(): void {
        this.filteredProducts = this.products

        this.productService.currentFiltroTexto.subscribe(filtroTexto => {
            this.filtroTexto = filtroTexto;
            this.filtrarProductos('', filtroTexto);
        });

    }

    ngOnDestroy(): void {
        this.getProducts.unsubscribe();
    }

    getProductsByCategory(category: string): Product[] {
        return this.products.filter(product => product.category === category);
    }

    getSeverity(product: Product): string | null {
        switch (product.inventoryStatus) {
            case 'EN STOCK':
                return 'card-status-in';

            case 'POCO STOCK':
                return 'card-status-low';

            case 'SIN STOCK':
                return 'card-status-out';

            default:
                return null;
        }
    };

    openModal(product: Product) : void {
        const dialogRef = this.dialog.open(AddToCartComponent, {width: '600px', data: product, position: undefined});

        // dialogRef.afterClosed().subscribe(result => {
        // });
    }

    filtrarProductos(category:string, value?: string) {
        if (!value) {
          return this.products.filter(product => product.category === category);
        } else {
          return this.products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase()) && product.category === category
          );
        }
    }
}
