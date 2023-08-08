import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false
  userEmail:string

  private sub:Subscription
  constructor(private recipeDataStorage:DataStorageService, private authService:AuthService) {
  }
  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // Simplified condition to set isAuthenticated
      this.userEmail = user ? user.email : null; // Set userEmail to the user's email or null if not authenticated
    });
  }

  addingRecipeToDatabase(){
    this.recipeDataStorage.storeRecipe()

  }

  fetchRecipeFromDatabase(){
    this.recipeDataStorage.getRecipe().subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


  Logout(){
    this.authService.logout()
  }

}
