import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren, PreloadingStrategy } from '@angular/router';
import {TodosComponent} from "./todos/todos.component";




const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  //implementing lazy loading here
  {
    path: 'recipes', loadChildren: () => import('./recipes/recipes.module')
      .then(m => m.RecipesModule)
  },
  //implementing lazy loading here
  {
    path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping.module')
      .then(m => m.ShoppingModule),
    data: {
      breadcrumb: 'Shopping List'
    }
  },
  {
    path: 'auth', loadChildren:  () : Promise<any> => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'todo', component:TodosComponent
  }


];

@NgModule({
  //using preloading strategy in lazy loading to load the modules beforehand when there is slow internet so that people doesn't have to wait, you can turn off too
  imports: [RouterModule.forRoot(appRoutes,)], //{preloadingStrategy:PreloadingStrategy},
  exports: [RouterModule]
})
export class AppRoutingModule {

}
