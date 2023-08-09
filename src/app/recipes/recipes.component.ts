import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {StatuscontainerComponent} from "./statuscontainer/statuscontainer.component";
import {DynamicComponentService} from "./dynamic-component.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  //sending message to child component RecipeListComponent. There the @Input will fetch this data form this parent
  parentMessage =
    {
      name:"kushal",
      class:24,
      age:99
    };

  newMessage:string

//getting properties from recipe-list child component
  @ViewChild(RecipeListComponent, {static:true}) child:RecipeListComponent
  @ViewChild(StatuscontainerComponent) statusContainer: StatuscontainerComponent;




  //getting data from child component RecipeListComponent
  add(toParent:string){

    this.newMessage = toParent


  }
  constructor(private dynamicComponentService:DynamicComponentService ) { }



  ngOnInit() {
    // getting the hello property from the child which is RecipeListComponent and console logging it by using the ViewChild Property.
    console.log("YOO MESSAGE PRINTED: " + this.child.hello);
  }
  toggleStatus(online: boolean) {
    const container = this.statusContainer.dynamicComponentContainer;
    const status = online ? 'online' : 'offline';
    this.dynamicComponentService.renderComponent(status, container);
  }


}
