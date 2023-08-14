import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";


import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})

export class AuthComponent {
    reCAPTCHA_site_key = environment.reCAPTCHAKEY;
    recaptchaResponse: string;

    showPassword = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }


    isLoggedIn = true;
    isLoadingSpinner = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {

    }

    onRecaptchaChange(event: string): void {
        this.recaptchaResponse = event;

    }

    onSwitchMode() {
        this.isLoggedIn = !this.isLoggedIn

    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }
        if (!this.recaptchaResponse) {
            this.error = 'Please complete the reCAPTCHA.';
            return;
        }

        const email = form.value.email
        const password = form.value.password
        this.isLoadingSpinner = true

        let authObs: Observable<AuthResponseData>;   //to reduce code so that both login and register can subscribe together in one

        if (this.isLoggedIn) {
            authObs = this.authService.loginUser(email, password);

        } else {
            authObs = this.authService.signUp(email, password);
        }
        authObs.subscribe(response => {
            console.log(response);
            this.isLoadingSpinner = false
            this.router.navigate(['/']);


        }, errorMessage => {
            console.log(errorMessage)
            this.error = errorMessage
            this.isLoadingSpinner = false
        })

        form.resetForm();



    }

}
