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
  selectedView='';
  views=['Datum dospeća','Cena rastuće','Cena opadajuće']
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

  sort(){
    if(this.selectedView!=''){
      if(this.selectedView=='Datum dospeća'){
        this.orders = this.orders.sort(
          (objA, objB) => new Date(objA.deliveryDate).getTime() - new Date(objB.deliveryDate).getTime(),
        );
      }
      else if(this.selectedView=='Cena rastuće'){
        this.orders = this.orders.sort(
          (objA, objB) => objA.price - objB.price,
        );
      }
      else if(this.selectedView=='Cena opadajuće'){
        this.orders = this.orders.sort(
          (objA, objB) => objB.price - objA.price,
        );
      }
      this.dataSource=this.orders
    }

  }

}
