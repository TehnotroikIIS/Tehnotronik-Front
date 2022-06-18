import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.scss']
})
export class StorageViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'quantity'];
 
  allCategories: any[] = [];
  selectedView='';
  showProducts:any[]=[];
  allProducts: any[] = [];
  dataSource = this.showProducts;
  selectedCategory:any;
  views=['Po kategorijama','Po prostorijama']
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService

  ) { }

  ngOnInit(): void {
    this.getAllcategories();
    this.getAllProducts();
  }

  getAllcategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.allCategories = data;
    })
  }

  getAllProducts() {
    this.productService.getAllproducts().subscribe(data => {
      this.allProducts = data;
      this.allProducts.forEach(element => {
        this.productService.getProducLocation(element.id).subscribe(data1 => {
          element.location = data1;

        })
      });
    })
  }

  getProductsByCategory(){
    this.productService.getProductsByCategory(this.selectedCategory.id).subscribe(data=>{
      this.showProducts=data;
      this.dataSource = this.showProducts;
    })
  }

}
