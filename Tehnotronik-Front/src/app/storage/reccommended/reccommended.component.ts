import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-reccommended',
  templateUrl: './reccommended.component.html',
  styleUrls: ['./reccommended.component.scss']
})
export class ReccommendedComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity','add'];
recommended:any[]=[];
dataSource :any=[];
delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  constructor(
    private productService:ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  async getAll(){
    this.productService.getRecommended().subscribe(async data=>{
      this.recommended=data;
      this.recommended.forEach(element => {
        this.productService.getProductById(element.productId).subscribe(data1=>{
          element.name=data1.name;
        })
      });
      await this.delay(500);
      this.dataSource=this.recommended
    })
   
  }
  addOrder(element:any){
  
    localStorage.setItem('selectedOrder', JSON.stringify(element));
    this.router.navigate(['/add-order']);

  }

}
