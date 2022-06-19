import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'price','deliveryTime'];
  orders:any[]=[];
  selectedView:any;
  views=['Datum dospeća','Cena rastuče','Cena opadajuće']
  dataSource :any=[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.productService.getAllStorageOrders().subscribe(data=>{
      this.orders=data;
      this.dataSource=this.orders
    })
  }

}
