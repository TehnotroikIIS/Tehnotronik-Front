export interface StorageOrder {
    id:string;
    storageProductId: string;
    quantity: number;
    price:number;
    createdDate:Date;
    deliveryDate:Date
}
