import { Cart } from "./Cart.model";

export class User {

    id: string;
    name: string;
    password: string;
    membership: string;
    userImage: string;
    compras: Cart[] = [];
    
}