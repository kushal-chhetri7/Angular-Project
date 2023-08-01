import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService) { }


  storeRecipe(){
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://udemypracticeproject-5b98a-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      })
  }


  getRecipe(){
      return this.http
        .get<Recipe[]>('https://udemypracticeproject-5b98a-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map( recipes =>{                     //this is ts map function of angular
            return recipes.
            map( recipe => {                //this is normal js map
              return { ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []}  //if there is no ingredients show empty array rather than not showing anything in database or console
      })
    }),tap( response => {
      this.recipeService.setRecipe(response)
    }));
  }


}
