import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    userId:string;
    shoppingCartItems: ShoppingCartItem[];
}