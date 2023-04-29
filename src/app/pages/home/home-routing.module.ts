import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'about-us',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsPageModule),
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainPageModule),
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('./contact-us/contact-us.module').then(
            (m) => m.ContactUsPageModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderPageModule),
      },
      {
        path: 'user-info',
        loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoPageModule)
    },
    ],
  },
  {
    path: '',
    redirectTo: 'home/main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
