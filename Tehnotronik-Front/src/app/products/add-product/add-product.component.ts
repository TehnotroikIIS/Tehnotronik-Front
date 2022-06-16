import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  categories: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private categoryService: CategoryService
  ) {
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  category = new FormControl();

  get login(): { [key: string]: AbstractControl; } { return this.addForm.controls; } 

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      alert('Greska!')
    })

  }

  addProduct() {

  }

}
