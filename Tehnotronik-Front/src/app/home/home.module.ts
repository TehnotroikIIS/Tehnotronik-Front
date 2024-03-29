import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarUnregisteredComponent } from '../shared/navbar-unregistered/navbar-unregistered.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from '../auth/user-profile/user-profile.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutUsComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    FormsModule
  ]
})
export class HomeModule { }
