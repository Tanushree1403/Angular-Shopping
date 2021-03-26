import {NgModule} from '@angular/core';
import{PreloadAllModules, RouterModule} from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductListResolver } from './products/productList-resolver.service';
import {AuthGuard} from './user/auth.guard';
import { SelectiveStrategy } from './selective-stratergy.service';
@NgModule({
    imports:[ 
        RouterModule.forRoot([
        {path: 'welcome', component: WelcomeComponent},
        {path: '', redirectTo: 'welcome', pathMatch:'full'},
        {
          path:'products', canLoad:[AuthGuard],
          data: { preload: true },
          //canActivate: [AuthGuard], 
          resolve:{ productListResolvedData:ProductListResolver },
          loadChildren:()=>
            import('./products/product.module').then(m=>m.ProductModule)
        },
        { path: '**', component:PageNotFoundComponent }
      ], {  preloadingStrategy: SelectiveStrategy , enableTracing: true })
    ],
      exports:[RouterModule]
})
export class AppRoutingModule {}