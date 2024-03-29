import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  displayedColumns: string[] = ['name', 'category','location', 'quantity','edit','order'];
 locations=['A1','A2','A3','B1','B2','B3']
  allCategories: any[] = [];
  selectedView='';
  element: any;
  renderer: any;
  @ViewChild('pdfTable', {static: true}) pdfTable!: ElementRef;

  showProducts:any[]=[];
  productsByCategory:any[]=[];
  allProducts: any[] = [];
  dataSource :any=[];
  products:any[]=[];
  selectedLocation:any;
  selectedCategory:any;
  views=['Po kategorijama','Po prostorijama']
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllcategories();
    this.getAllStorageProducts();
  }

  printFacture(){
    /*html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas);
    });*/
    html2canvas(this.pdfTable.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.pdfTable.nativeElement.innerHTML)
      PDF.save('angular-invoice-pdf-demo.pdf');
      window.location.reload();
    });
    
  }
  getAllcategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.allCategories = data;
    })
  }

  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.products=data;
    })
  }

  getAllStorageProducts() {
    this.productService.getAllStorageProducts().subscribe(data => {
      this.allProducts = data;
      this.allProducts.forEach(element => {
        if(element.location==0){
          element.location='A1'
        }
        else if(element.location==1){
          element.location='A2'
        }
        else if(element.location==2){
          element.location='A3'
        }
        else if(element.location==3){
          element.location='B1'
        }
        else if(element.location==4){
          element.location='B2'
        }
        else if(element.location==5){
          element.location='B3'
        }
      });
     
    })
  }

  getProductsByCategory(){
    this.showProducts=[];
    this.productService.getProductsByCategory(this.selectedCategory.id).subscribe(data=>{
      this.productsByCategory=data;
      this.productsByCategory.forEach(element => {
        this.allProducts.forEach(element1 => {
          if(element.id==element1.productId){
            element1.name=element.name
            element1.category=this.selectedCategory.name
            this.showProducts.push(element1)
          }
        });
      });
      this.dataSource = this.showProducts;
    })
  }

  addOrder(element:any){
  
    localStorage.setItem('selectedOrder', JSON.stringify(element));
    this.router.navigate(['/add-order']);

  }

  getProductsByLocation(){
    this.showProducts=[];
    this.products.forEach(element => {
      this.allProducts.forEach(element1 => {
        if(element.id==element1.productId && element1.location==this.selectedLocation){
          element1.name=element.name
          element1.category=element.categoryId
          this.showProducts.push(element1)
        }
      });
    });
    this.dataSource = this.showProducts;
  }

  report(){
    let names: any[]=[];
    let quantities: any[]=[];
    let locations: any[]=[]
    console.log(this.allProducts)
    this.products.forEach(element => {
      console.log(element)
      names.push(element.name);
      quantities.push(element.quantity);
      locations.push(element.location)

    });
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('quantities', JSON.stringify(quantities));
    localStorage.setItem('locations', JSON.stringify(locations));
    this.router.navigate(['/report'])
  }



}
