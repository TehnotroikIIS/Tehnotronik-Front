import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
orders: any[]=[];
allOrders: any[]=[];
  constructor(
  private ordersService: OrdersService,
  private jwtService: JwtService) { }

  ngOnInit(): void {
    this.orders=[];
    this.getAllOrders();
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

  viewOrder(){}

}
