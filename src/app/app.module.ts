import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { CoreModule } from './core.module';
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";
import { BreadcrumbComponent } from "./breadcrump/breadcrumb.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StatuscontainerComponent} from "./statuscontainer/statuscontainer.component";
import {OnlineComponent} from "./online/online.component";
import {OfflineComponent} from "./offline/offline.component";
import {DynamicComponentService} from "./dynamic-component.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { GraphQLModule } from './graphql.module';
import {TodosComponent} from "./todos/todos.component";
import {DragDropModule} from "@angular/cdk/drag-drop";











@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    StatuscontainerComponent,
    OnlineComponent,
    OfflineComponent,
    TodosComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDO0cf5qUmChLUnVMdUuzf7dJR_0dV5h80",
      authDomain: "udemypracticeproject-5b98a.firebaseapp.com",
      databaseURL: "https://udemypracticeproject-5b98a-default-rtdb.firebaseio.com",
      projectId: "udemypracticeproject-5b98a",
      storageBucket: "udemypracticeproject-5b98a.appspot.com",
      messagingSenderId: "131250047793",
      appId: "1:131250047793:web:02ba3d0002f0a885d5be10",
      measurementId: "G-37M1R6E7ZN"
    }),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    DragDropModule,


  ],
  providers: [ShoppingListService,DynamicComponentService, RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
