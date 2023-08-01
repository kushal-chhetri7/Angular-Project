import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {DataStorageService} from "./data-storage.service";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({
  providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe>{
  constructor(private dataStorage: DataStorageService, private recipeService:RecipeService ) {

  }
  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipe = this.recipeService.getRecipes()
    if ( recipe.length === 0 ) {
      return this.dataStorage.getRecipe();
    }
    else {
      return recipe
    }
  }

}
