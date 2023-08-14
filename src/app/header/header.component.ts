import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {StatuscontainerComponent} from "../statuscontainer/statuscontainer.component";
import {DynamicComponentService} from "../dynamic-component.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false
  userEmail:string


  private sub:Subscription
  @ViewChild(StatuscontainerComponent) statusContainer: StatuscontainerComponent;

  constructor(private recipeDataStorage:DataStorageService, private authService:AuthService, private dynamicComponentService:DynamicComponentService ) {
  }
  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // Simplified condition to set isAuthenticated
      this.userEmail = user ? user.email : null; // Set userEmail to the user's email or null if not authenticated
    });


    const container = this.statusContainer.dynamicComponentContainer;
    this.dynamicComponentService.renderComponent('online', container);
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
    this.authService.logout();

    //set the status to false after logout()

  }
  toggleStatus(online: boolean) {
    const container = this.statusContainer.dynamicComponentContainer;
    const status = online ? 'online' : 'offline';
    this.dynamicComponentService.renderComponent(status, container);

  }

}
