import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from "./shopping-list.component";
import {SharedModule} from "../shared/shared.module";




const shoppingRoutes: Routes = [
  { path: '', component: ShoppingListComponent },


];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class ShoppingRouteModule {
}
