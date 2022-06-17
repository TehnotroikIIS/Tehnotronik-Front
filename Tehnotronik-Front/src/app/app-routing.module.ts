import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ContactComponent } from './home/contact/contact.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { EmployedMenuComponent } from './shared/employed-menu/employed-menu.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'all-products',
    component: AllProductsComponent
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'employed-menu',
    component: EmployedMenuComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
