import { ShippingInformation } from "./shipping-information";

export interface ShopOrder {
    userId:string;
    orderId:string;
    shippingInformation: ShippingInformation;
}