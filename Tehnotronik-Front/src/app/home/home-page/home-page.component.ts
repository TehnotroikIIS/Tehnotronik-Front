import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
name:any=''
  category:Category={
    name:''
  }
  constructor(
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
  }

  createCategory(){
    this.category.name=this.name;
    this.categoryService.createCategory(this.category).subscribe(data=>{
alert('Uspjesno')
    },error=>{
      
    }
    )
  }

}
