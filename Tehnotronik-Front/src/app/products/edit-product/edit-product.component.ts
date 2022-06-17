import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  categories: any[] = []
  selectedCategory:any;
  selectedProduct:any;
  editedProduct: Product = {
    name: '',
    price: 0,
    description: '',
    manufacturer: '',
    technicalDescription: '',
    categoryId: '',
    rate: 0,
    numberOfReviews: 0,
    isAvailable: true
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private productService:ProductService
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
      manufacturer: [''],
      technicalDescription: [''],
    });
  
  }

  ngOnInit(): void {
    this.getProductInfo();
   
  }


  get login(): { [key: string]: AbstractControl; } { return this.editForm.controls; }

 

 getProductInfo(){
  this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '');
  this.editForm.get('name')?.setValue(this.selectedProduct.name);
  this.editForm.get('price')?.setValue(this.selectedProduct.price);
  this.editForm.get('description')?.setValue(this.selectedProduct.description);
  this.editForm.get('manufacturer')?.setValue(this.selectedProduct.manufacturer);
  this.editForm.get('technicalDescription')?.setValue(this.selectedProduct.technicalDescription);
 }

  editProduct() {
    this.editedProduct.name=this.editForm.value.name;
    this.editedProduct.description=this.editForm.value.description;
    this.editedProduct.manufacturer=this.editForm.value.manufacturer;
    this.editedProduct.price=this.editForm.value.price;
    this.editedProduct.technicalDescription=this.editForm.value.technicalDescription;
    console.log(this.editedProduct)
    this.productService.createProduct(this.editedProduct).subscribe(data=>{
      alert('Uspješno ste dodali novi proizvod');
      this.router.navigate(['/employed-menu'])
    },error=>{
      alert('Greska!')
    })
  }
 
  



}
