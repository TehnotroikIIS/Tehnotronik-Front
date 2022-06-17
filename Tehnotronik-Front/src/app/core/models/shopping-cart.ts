import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    userId:string;
    shoppingCartItem: ShoppingCartItem[];
}