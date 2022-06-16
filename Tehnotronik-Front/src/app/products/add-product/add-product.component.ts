import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  categories: any[] = []
  selectedCategory:any;
  newProduct: Product = {
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
    private categoryService: CategoryService,
    private productService:ProductService
  ) {
    this.addForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
      manufacturer: [''],
      technicalDescription: [''],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }


  get login(): { [key: string]: AbstractControl; } { return this.addForm.controls; }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      alert('Greska!')
    })

  }

  addProduct() {
    this.newProduct.name=this.addForm.value.name;
    this.newProduct.description=this.addForm.value.description;
    this.newProduct.manufacturer=this.addForm.value.manufacturer;
    this.newProduct.price=this.addForm.value.price;
    this.newProduct.technicalDescription=this.addForm.value.technicalDescription;
    this.newProduct.categoryId=this.selectedCategory.id;
    console.log(this.newProduct)
    this.productService.createProduct(this.newProduct).subscribe(data=>{
      alert('Uspješno ste dodali novi proizvod');
      this.router.navigate(['/employed-menu'])
    },error=>{
      alert('Greska!')
    })
  }

}
