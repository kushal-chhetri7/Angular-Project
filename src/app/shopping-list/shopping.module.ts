import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingRouteModule} from "./shopping-route.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ShoppingRouteModule,
    SharedModule

  ]
})
export class ShoppingModule {}
