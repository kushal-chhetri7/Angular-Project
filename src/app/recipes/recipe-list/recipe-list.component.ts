import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  hello:string='hello there';

  @Input() message:any

//sending value to parent from this user input child component
  @Output() toParent = new EventEmitter<string>();

  add(value:string){
    this.toParent.emit(value);

  }

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    console.log("SHDJHJSD");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

