import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  rates:any[]=[]
  selectedProduct:any;
  constructor() { }

  ngOnInit(): void {
    this.getSelectedProduct();
  }

getSelectedProduct(){
  this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')|| '');
  console.log(this.selectedProduct);
  for (let i = 0; i < this.selectedProduct.rate; i++) {
    this.rates.push(i)
  }
}

}
