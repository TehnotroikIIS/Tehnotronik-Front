import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarUnregisteredComponent } from '../shared/navbar-unregistered/navbar-unregistered.component';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
