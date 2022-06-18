import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUnregisteredComponent } from './navbar-unregistered/navbar-unregistered.component';
import { AppRoutingModule } from '../app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeInfoComponent } from './home-info/home-info.component';
import { CategoriesSidebarComponent } from './categories-sidebar/categories-sidebar.component';
import { EmployedMenuComponent } from './employed-menu/employed-menu.component';
import { BlogsSidebarComponent } from './blogs-sidebar/blogs-sidebar.component';



@NgModule({
  declarations: [
    NavbarUnregisteredComponent,
    HomeInfoComponent,
    CategoriesSidebarComponent,
    EmployedMenuComponent,
    BlogsSidebarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NavbarUnregisteredComponent,
    HomeInfoComponent,
    CategoriesSidebarComponent,
    EmployedMenuComponent,
    BlogsSidebarComponent
  ]
})
export class SharedModule { }
