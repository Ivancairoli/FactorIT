import { Timestamp } from "rxjs";
import { Product } from "./Product.model";

export class Cart {

    fecha: any;
    monto: number;
    productos?: Product[];

    constructor(fecha: any, monto: number, productos?: Product[]) {

        this.fecha = fecha;
        this.monto = monto;
        productos ? this.productos = productos : null

    }

}