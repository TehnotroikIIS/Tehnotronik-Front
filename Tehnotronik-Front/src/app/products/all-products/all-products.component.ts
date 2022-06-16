import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts:any[]=[]
   products:any[]=[{
    name:'Ferit za kablove',
    price:256,
    description:'desciriton',
    manufacturer:'manufac',
    techicalDescription:'technical',
    categoryId:'id',
    rate:8,
    numberOfReviews:10,
    isAvailable:1
   }]
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  sort = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  sortList: string[] = ['Od najniže cene','Od najviše cene'];
  industryList: string[] = ['Svi','Dostupni'];
  ageList: string[] = ['<500', '500-3000', '3000-10000', '>10000']
  noExperienceList: any[] = []

  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.allProducts=data;
      console.log(this.allProducts)
    },error=>{
      alert('Greska!')
    })
  }

}
