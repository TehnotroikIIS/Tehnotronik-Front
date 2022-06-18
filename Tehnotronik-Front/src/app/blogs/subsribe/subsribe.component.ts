import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { FavoriteCategory } from 'src/app/core/models/favorite-category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-subsribe',
  templateUrl: './subsribe.component.html',
  styleUrls: ['./subsribe.component.scss']
})
export class SubsribeComponent implements OnInit {
  userId: any;
  favoriteCategories: any[] = [];
  categories: any[] = [];
  allcategories:any=[];
  favorite:FavoriteCategory={
    userId:'',
    categoryId:''
  }
  constructor(
    private categoryService: CategoryService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllCategories();
   // this.getFavoriteCategories();
  }

  getFavoriteCategories() {
    this.categoryService.getFavoriteByUser(this.userId).subscribe(data => {
      this.favoriteCategories = data;
      this.allcategories.forEach((element:any) => {
        this.favoriteCategories.forEach((element1: any) => {
          if(element1==element.id){
            this.categories.push(element);
          }
        });
      });
    },error=>{
      alert('Greska')
    })
  }

  getAllCategories(){
    this.categoryService.getAllBlogCategories().subscribe(data=>{
this.allcategories=data;
this.getFavoriteCategories();
    })
  }

  remove(list:any){
    this.favorite.userId=this.userId;
    list.forEach((element: { value: any; }) => {
      this.favorite.categoryId=element.value.id;
      this.categoryService.removeFromFavorites(this.favorite).subscribe(data=>{
      },error=>{
        return;
      }
      )
    });
    window.location.reload();
  }
}
