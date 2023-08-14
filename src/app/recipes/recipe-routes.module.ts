import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeResolverService} from "../shared/recipe-resolver.service";


const recipeRoutes:Routes = [
  { path: '', canActivate:[AuthGuard], component: RecipesComponent, data :
      { breadcrumb: 'Recipes'},
    children: [

      { path: '', component: RecipeStartComponent,
        data : {
        breadcrumb: ''
      },
      },

      { path: 'new', component: RecipeEditComponent,
        data : {
        breadcrumb: 'New Recipe'
      }
      },

      { path: ':id', component: RecipeDetailComponent,
        resolve:[RecipeResolverService],
        data : {
        breadcrumb: 'Recipe Detail'
      }
      },

      { path: ':id/edit', component: RecipeEditComponent,
        resolve:[RecipeResolverService],
        data : {
        breadcrumb: 'Edit Recipe Details'

      }
      },
    ] },
]
@NgModule({
  imports:[RouterModule.forChild(recipeRoutes)],
  exports:[RouterModule]

})

export class RecipeRoutesModule {

}
