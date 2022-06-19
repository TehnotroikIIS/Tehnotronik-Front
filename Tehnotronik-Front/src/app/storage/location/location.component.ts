import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  addForm: FormGroup;
  products:any[]=[]
  sortValue:any;
  location='';
  constructor(
    
    private formBuilder: FormBuilder,
    private productService:ProductService
  ) {
    this.addForm = this.formBuilder.group({
      name: [''],
    });
   }

  ngOnInit(): void {
    
  }
  get searchF(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }
  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.products=data;
    })
  }
  sarchByName() {
    let name = this.addForm.value.name;
    if (name != '') {
      this.productService.searchProduct(name).subscribe((data: any) => {
        this.products = data;
        console.log(this.products)
      },
        error => {
          console.log(error.error.message);
        });
    } else {
      this.getAllProducts();
    }

  }

  view(){
   // alert(this.sortValue.name)
    this.productService.getProducLocation(this.sortValue.id).subscribe(data=>{
      if(data==0){
        this.location='A1'
      }
      else if(data==1){
        this.location='A2'
      }
      else if(data==2){
        this.location='A3'
      }
      else if(data==3){
        this.location='B1'
      }
      else if(data==4){
        this.location='B2'
      }
      else if(data==5){
        this.location='B3'
      }
    });
    
  }

}
