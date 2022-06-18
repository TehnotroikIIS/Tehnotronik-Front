import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscriber } from 'rxjs';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AddBlogComponent } from './blogs/add-blog/add-blog.component';
import { AllBlogsComponent } from './blogs/all-blogs/all-blogs.component';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { FavoriteBlogsComponent } from './blogs/favorite-blogs/favorite-blogs.component';
import { PopularBlogsComponent } from './blogs/popular-blogs/popular-blogs.component';
import { SubsribeComponent } from './blogs/subsribe/subsribe.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ContactComponent } from './home/contact/contact.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { SalesComponent } from './products/sales/sales.component';
import { EmployedMenuComponent } from './shared/employed-menu/employed-menu.component';
import { FinishShoppingComponent } from './shopping/finish-shopping/finish-shopping.component';
import { OrderComponent } from './shopping/order/order.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { UserDetailsComponent } from './shopping/user-details/user-details.component';
import { UserOrdersComponent } from './shopping/user-orders/user-orders.component';

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
    path: 'sales',
    component: SalesComponent
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
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
  },
  {
    path: 'all-blogs',
    component: AllBlogsComponent
  },
  {
    path: 'popular-blogs',
    component: PopularBlogsComponent
  },
  {
    path: 'favorite-blogs',
    component: FavoriteBlogsComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'subscribe-blogs',
    component: SubsribeComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent
  },
  {
    path: 'edit-blog',
    component: EditBlogComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'finish-shopping',
    component: FinishShoppingComponent
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
