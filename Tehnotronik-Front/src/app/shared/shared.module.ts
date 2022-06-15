import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUnregisteredComponent } from './navbar-unregistered/navbar-unregistered.component';
import { AppRoutingModule } from '../app-routing.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    NavbarUnregisteredComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [
    NavbarUnregisteredComponent
  ]
})
export class SharedModule { }
