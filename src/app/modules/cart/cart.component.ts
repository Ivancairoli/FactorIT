import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/Cart.model';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  productsInCart: Product[] = [];
  total: number;
  discount: number;
  
  isVip: boolean = false;

  usuario: User = null;


  totalDiscount: number;
  normalDiscount: number; 
  specialDiscount: number; 
  vipDiscount: number;
  sesionIniciada: boolean = false

  
  suscription: Subscription;
  totalFinal: number;

  product: Product | null;
  date1: Date ;
  totalSelectedQuantity: number;
  promotionalDate: boolean = false;

  fechasEspeciales: Date[] = [
    new Date(2024, 0, 24),
    new Date(2024, 10, 4)
  ];
  cheapestProductPrice: number;

  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router, private authService: AuthService, private userService: UserService) {
    this.loggedIn()
  }

  ngOnInit(): void {
    this.diferenciarElementos();
  }

  setearUserAux() : void {

  }

  loggedIn(): void {
    this.authService.datosUsuario.subscribe(res => {

      if(!res) return;
      this.isVip = res.membership === 'VIP';

      this.usuario = res

    })
  }


  onDateChange(event: Date): boolean {
    this.promotionalDate = this.fechasEspeciales.some(fechaEspecial =>
      this.isSameDay(fechaEspecial, event)
    );
    this.diferenciarElementos();
    return this.promotionalDate;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
  }

  //1
  diferenciarElementos() {
    this.productService.currentProducts.subscribe(products => {
      const consolidatedProducts: Product[] = products.reduce((acc: Product[], product) => {
        const existingProduct = acc.find(p => p.id === product.id);
        if (existingProduct) {
          let newSelectedQuantity = existingProduct.selectedQuantity + product.selectedQuantity;
          existingProduct.selectedQuantity = newSelectedQuantity > product.quantity ? product.quantity : newSelectedQuantity;
        } else {
          product.selectedQuantity = product.selectedQuantity > product.quantity ? product.quantity : product.selectedQuantity;
          acc.push({...product});
        }
        return acc;
      }, [] as Product[]);
      this.productsInCart = consolidatedProducts;

      this.recalculateTotal()

    });
  }

  //Esta función elimina directamente el carro
  deleteCart(): void {
    this.productService.deleteCart();
  }

  deleteElement(productToDelete: Product): void {
    this.productsInCart = this.productsInCart.filter(product => product.id !== productToDelete.id);
    this.productService.updateCart(this.productsInCart);
    this.recalculateTotal();
  }

  recalculateTotal(): void {
    this.loggedIn();
    this.total = 0;
    this.totalSelectedQuantity = 0;
    this.productsInCart.forEach(product => {
      this.total += Number(product.price) * product.selectedQuantity;
      this.totalSelectedQuantity += product.selectedQuantity;
    });
  
    this.specialDiscount = 0;
    this.normalDiscount = 0;
    this.totalDiscount = 0;
    this.vipDiscount = 0;
    this.totalFinal = 0
  
    this.cheapestProductPrice = 0;
  
    if (this.totalSelectedQuantity === 4) {
      this.totalDiscount = this.total * 0.75
      this.totalFinal = this.totalDiscount;
    }
    
    else if (this.totalSelectedQuantity > 10) {
      if (this.isVip && !this.promotionalDate) {
        this.cheapestProduct();
        this.vipDiscount = this.total - this.cheapestProductPrice - 500;
        this.totalFinal = this.vipDiscount;
      } else if (this.isVip && this.promotionalDate  ) {
        this.cheapestProduct();
        this.vipDiscount = this.total - this.cheapestProductPrice - 500;
        this.totalFinal = this.vipDiscount;
      } else if (!this.isVip && this.promotionalDate) {
        this.specialDiscount = this.total - 300;
        this.totalFinal = this.specialDiscount;
      } else {
        this.normalDiscount = this.total - 100;
        this.totalFinal = this.normalDiscount;
      }
    }
    else {
      this.totalFinal = this.total;
    }
  }

  cheapestProduct(): void {
    const cheapestProduct = this.productsInCart.reduce((cheapest, product) => 
    !cheapest || product.price < cheapest.price ? product : cheapest, null);
    this.cheapestProductPrice = cheapestProduct ? Number(cheapestProduct.price) * 1 : 0;
  }


  buy(): void {
    const cart: Cart = {fecha: new Date(), monto: this.totalFinal, productos: [...this.productsInCart]}
    if (this.usuario) {

        this.usuario.compras.push(cart);
        this.userService.updateUser(this.usuario.id, this.usuario);
        this.dialog.open(BuyModalComponent, {width: '600px'});
        this.productService.deleteCart();
        let usuario = this.userService.getUserById(this.usuario.id);
        usuario.subscribe(res => {
          this.authService.guardarDatosUsuario(res);
        })
        
        if(this.usuario.membership === 'VIP'){
          return
        }
        else {
          this.pasarAVip(this.usuario);
          
          
        }

    } else {
      alert("Debe iniciar sesión para poder realizar la compra")
    }

  }

  pasarAVip(user: User) {
    let totalComprasTodas: number = 0;
    user.compras.forEach( element => {
      totalComprasTodas += element.monto;
    })
    if(totalComprasTodas > 10000) this.actualizarUsuario(user);
    else return
    
  }

  actualizarUsuario(user: User) {
    user.membership = 'VIP',
    this.userService.updateUser(user.id, user).then(() => 
      alert('Ha pasado a VIP')
    )
  }


  redirect(): void {
    this.router.navigateByUrl('/shop')
  }

  
}
