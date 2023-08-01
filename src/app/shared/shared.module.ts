import {NgModule} from "@angular/core";
import {LoadingSpinerComponent} from "./loading-spiner/loading-spiner.component";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[
    LoadingSpinerComponent,
    DropdownDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[
    LoadingSpinerComponent,
    DropdownDirective,
    CommonModule

  ]
})

export class SharedModule {

}
