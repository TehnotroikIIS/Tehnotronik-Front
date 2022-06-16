import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts:any[]=[];
  searchForm:any;
  breakpoint: number = 1;
  gutterSize: string = '40px';
  priceValue:any;
  availableValue:any;
  sortValue:any;

  constructor(
    private productService:ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
   }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
    this.getAllProducts();
  }
  get searchF(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

 
  sort = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  sortList: string[] = ['Od najniže cene','Od najviše cene'];
  availableList: string[] = ['Svi','Dostupni'];
  priceList: string[] = ['<500', '500-3000', '3000-10000', '>10000']
  noExperienceList: any[] = []

  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.allProducts=data;
      console.log(this.allProducts)
    },error=>{
      alert('Greska!')
    })
  }


  sarchByName() {
    let name=this.searchForm.value.name;
    if(name!=''){
      this.productService.searchProduct(name).subscribe((data: any) => {
        this.allProducts = data;
      },
        error => {
          console.log(error.error.message);
        });
    }else{
      this.getAllProducts();
    }
   
  }

  onResize(event: any) {
    if(event.target.innerWidth<=786){
      this.breakpoint=1;
    }
    else if(event.target.innerWidth>786 && event.target.innerWidth<1200){
      this.breakpoint=2;
    }
    else{
      this.breakpoint=3;
    }
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
  }

  goToProductDetails(product:any){

  }


}
