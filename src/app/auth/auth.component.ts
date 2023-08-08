import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";

import {Router} from "@angular/router";

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html',
  styleUrls:['./auth.component.css'],
})

export class AuthComponent {

  isLoggedIn = true;
  isLoadingSpinner = false;
  error:string=null;
  constructor( private authService:AuthService, private router:Router) {
  }
  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn

  }
  onSubmit(form:NgForm){
    debugger
    if(!form.valid){
      return;
    }
    const email = form.value.email
    const password = form.value.password
    this.isLoadingSpinner=true

    let authObs : Observable<AuthResponseData>;   //to reduce code so that both login and register can subscribe together in one

    if(this.isLoggedIn) {
      authObs = this.authService.loginUser(email,password);

    } else {
      authObs = this.authService.signUp(email,password);
    }
    authObs.subscribe(response => {
      console.log(response);
      this.isLoadingSpinner=false
      this.router.navigate(['/']);


    }, errorMessage => {
      console.log(errorMessage)
      this.error = errorMessage
      this.isLoadingSpinner=false
    })

    form.resetForm();
    

  }

}
