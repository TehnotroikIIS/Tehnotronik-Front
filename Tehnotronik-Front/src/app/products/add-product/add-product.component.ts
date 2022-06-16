import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MatDialog } from '@angular/material/dialog';
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
  addCategoryForm: FormGroup;
  @ViewChild('addCategory') addDialog!: any;
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
    public dialog: MatDialog,
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
    this.addCategoryForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }


  get login(): { [key: string]: AbstractControl; } { return this.addForm.controls; }
  get category(): { [key: string]: AbstractControl; } { return this.addCategoryForm.controls; }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      alert('Greska!')
    })
  }

  onCategoryChange(event:any){
    alert('sdd')
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
  opetAddCategoryDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  add():any{
    alert(this.addCategoryForm.value.name)
    let category={
      name:this.addCategoryForm.value.name
    }
    this.categoryService.createCategory(category).subscribe(data=>{
      alert('Uspesno dodata')
      window.location.reload()
    },error=>{
      alert('Greska')
    })
  }



}
