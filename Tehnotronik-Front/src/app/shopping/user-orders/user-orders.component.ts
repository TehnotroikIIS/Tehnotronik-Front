import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  selectedOrder: any;
  orders: any[]=[];
  allOrders: any[]=[];
  constructor(
  private ordersService: OrdersService,
  private jwtService: JwtService,
  private router: Router) { }

  ngOnInit(): void {
    this.orders=[];
    this.getAllOrders();
    this.getSelectedOrder();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getAllOrders() {
    this.ordersService.getOrderByUserId(this.jwtService.getUserId()).subscribe(data => {
      this.orders= data;
      console.log(this.allOrders)
    }, error => {
      alert('Još niste napravili ni jednu porudžbinu.')
    })
    await this.delay(500);
  }

  //viewOrder(order: any){
  viewOrder(){
    //localStorage.setItem('selectedProduct', JSON.stringify(order));
    this.router.navigate(['/order'])
  }
  getSelectedOrder() {
    this.selectedOrder = JSON.parse(localStorage.getItem('selectedOrder') || '');
    console.log(this.selectedOrder);
  }

}
