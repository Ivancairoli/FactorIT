export class Product {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    selectedQuantity: number;

    constructor(id: number, name: string, description:string, image: string, price: number, category: string, quantity: number, inventory: string, selectedQuantity: number) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.inventoryStatus = inventory;
        this.selectedQuantity = selectedQuantity

    }

}