import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'quantity'];
products:any[]=[];
allproducts:any[]=[];
showProducts:any[]=[];
dataSource :any=[];
orders:any[]=[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getOrders();
  }

  getOrders(){
    this.productService.getAllStorageOrders().subscribe(data=>{
      this.orders=data
    })
  }

  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.allproducts=data;
      this.getProducts()
    })
  }

  getProducts(){
    this.productService.getRecommended().subscribe(data=>{
      this.products=data;
      this.allproducts.forEach(element => {
        this.products.forEach(element1 => {
          if(element.id==element1.productId){
            if(element1.location==0){
              element1.location='A1'
            }
            else if(element1.location==1){
              element1.location='A2'
            }
            else if(element1.location==2){
              element1.location='A3'
            }
            else if(element1.location==3){
              element1.location='B1'
            }
            else if(element1.location==4){
              element1.location='B2'
            }
            else if(element1.location==5){
              element1.location='B3'
            }
              element1.name=element.name;
              this.showProducts.push(element1);
          }
        });
      });
      this.dataSource=this.showProducts;
    })
  
  }

}
