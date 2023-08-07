import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { CoreModule } from './core.module';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {BreadcrumbComponent} from "./breadcrump/breadcrumb.component";





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    AngularFireStorageModule



  ],
  providers: [ShoppingListService, RecipeService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
