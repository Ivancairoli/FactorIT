import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/Product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  value: number;
  total: number;

  constructor( public dialogRef: MatDialogRef<AddToCartComponent>, @Inject(MAT_DIALOG_DATA) public data: Product,private productService: ProductService) { 
    this.data.quantity === 0 ? this.value = 0 : this.value = 1;
  }

  ngOnInit(): void { }

  onValueChange(newValue: number): void {
    this.value = newValue;
    this.calculateTotal();
  }

  calculateTotal(): number {
    if(this.value === 0) return this.total = this.data.price;
    if(this.value === 1) return this.total = this.data.price;
    else this.total = this.value * this.data.price;
    return this.total;
  }

  addToCart(): void {
    if(this.data.selectedQuantity > 0) {
      this.data.selectedQuantity = this.value;
      this.productService.addProduct(this.data);
    }
  }



}
