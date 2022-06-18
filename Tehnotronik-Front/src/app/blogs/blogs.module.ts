import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { PopularBlogsComponent } from './popular-blogs/popular-blogs.component';
import { FavoriteBlogsComponent } from './favorite-blogs/favorite-blogs.component';
import { SubsribeComponent } from './subsribe/subsribe.component';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    AddBlogComponent,
    AllBlogsComponent,
    BlogDetailsComponent,
    EditBlogComponent,
    PopularBlogsComponent,
    FavoriteBlogsComponent,
    SubsribeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    RouterModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    MatListModule
  ]
})
export class BlogsModule { }
