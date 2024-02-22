import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { of } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  //Esto se utiliza para el filtro (no se llegó a terminar)
  private filtroTextoSource = new BehaviorSubject<string>('');
  currentFiltroTexto = this.filtroTextoSource.asObservable();
  //Esto lo utilizo para pasar los componentes al carro
  private productsSource = new BehaviorSubject<Product[]>([]);
  currentProducts = this.productsSource.asObservable();


  constructor() { }

  //Filtro
  cambiarFiltroTexto(texto: string): void {
    this.filtroTextoSource.next(texto);
  }

  //Carro
  addProduct(product: Product) {
    if(product){
      const currentValue = this.productsSource.value;
      this.productsSource.next([...currentValue, product]);
    }
  }

  //Esto elimina el carro directamente
  deleteCart(): void {
    this.productsSource.next([]);
  }

  updateCart(lista: Product[]): void{
    this.productsSource.next(lista)
  }

  //Todos los productos devueltos por observable
  getProducts(): Observable<Product[]>{

    this.products.push({
      id: 1,
      name: 'Parlante JBL',
      description: 'JBL Charge 5 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.',
      image: '../../../assets/JBL.jpg',
      price: 500,
      category: 'Electronica',
      quantity: 10,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 2,
      name: 'Velador Led',
      description: 'Esta lámpara inalámbrica 3 en 1 es una luz ambiental, una base de carga inalámbrica rápida de 10W y un altavoz Bluetooth.',
      image: '../../../assets/VeladorGoogle.png',
      price: 1000,
      category: 'Electronica',
      quantity: 2,
      inventoryStatus: 'POCO STOCK',
      selectedQuantity: 1,
    },
    {
      id: 3,
      name: 'Reloj Smartwatch',
      description: 'Funciona con las aplicaciones WEARFIT Y HIWATCH',
      image: '../../../assets/Smartwatch.jpg',
      price: 3000,
      category: 'Electronica',
      quantity: 12,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 4,
      name: 'Joystick Xbox',
      description: 'Pulveriza a tus competidores con el Control inalámbrico Xbox: Edición especial Stormcloud Vapor, con remolinos dinámicos de color azul y negro que son únicos en cada control.',
      image: '../../../assets/Joystick Xbox.jpg',
      price: 5000,
      category: 'Electronica',
      quantity: 6,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 5,
      name: 'Torre de sonido Noblex',
      description: 'El parlante JBL es un excelente producto',
      image: '../../../assets/TorreSonido.jpg',
      price: 4000,
      category: 'Electronica',
      quantity: 5,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    //Tecnología
    {
      id: 6,
      name: 'Televisor Noblex 32"',
      description: 'El parlante JBL es un excelente producto',
      image: '../../../assets/Noblex32.jpg',
      price: 2000,
      category: 'Tecnología',
      quantity: 7,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 7,
      name: 'Smart Tv LG 43"',
      description: 'LG es innovación y eso se ve en cada uno de sus productos tecnológicos, pensados especialmente para que tu familia y vos disfruten mucho más de la vida. Tener un televisor LG es aprovechar la más alta calidad del mercado.',
      image: '../../../assets/Tvlg43.jpg',
      price: 1500,
      category: 'Tecnología',
      quantity: 2,
      inventoryStatus: 'POCO STOCK',
      selectedQuantity: 1,
    },
    {
      id: 8,
      name: 'Smart Tv Samsung 50"',
      description: 'Sumérgete en la era del entretenimiento con la Smart TV Samsung 50" UN50CU7000GCZB, donde la claridad se encuentra con la inteligencia.',
      image: '../../../assets/SmartTVSamsung50.jpg',
      price: 5000,
      category: 'Tecnología',
      quantity: 0,
      inventoryStatus: 'SIN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 9,
      name: 'Smart Tv Samsung 65"',
      description: 'Tecnología HDR para una calidad de imagen mejorada.',
      image: '../../../assets/TV-Samsung-65-Crystal-UHD-4K-CU7000-5.jpg',
      price: 7000,
      category: 'Tecnología',
      quantity: 5,
      inventoryStatus: 'EN STOCK',
      selectedQuantity: 1,
    },
    {
      id: 10,
      name: 'Smart Tv Samsung 80"',
      description: 'La tecnología Quantum Dot de Samsung transforma la luz en una amplia gama de colores vivos a cualquier nivel de brillo, ofreciendo una calidad de imagen superior',
      image: '../../../assets/Samsung80.png',
      price: 9000,
      category: 'Tecnología',
      quantity: 1,
      inventoryStatus: 'POCO STOCK',
      selectedQuantity: 1,
    })

    return of(this.products)
  }

}
