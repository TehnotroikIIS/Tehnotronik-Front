import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShoppingModule } from './shopping/shopping.module';
import { BlogsModule } from './blogs/blogs.module';
import { StorageModule } from './storage/storage.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    ProductsModule,
    ShoppingModule,
    MatGridListModule,
    BlogsModule,
    StorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
