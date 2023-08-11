import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;  //optional for registering but for login it's important . TO check if user is already registered in the application
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null)
    private timeOutWhenUserPressedLogout: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }).pipe(catchError(this.handleError), tap(resData => { //runs the code and doesn't return anything
            this.handleuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn,);

        }))
    }

    autoLogin() {                              //automatic login in the user
        const userData: {
            email: string;
            id: string,
            _token: string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDate)

        }
    }

    autoLogout(expirationDuration: number) {
        this.timeOutWhenUserPressedLogout = setTimeout(() => {     //very important
            this.logout()
        }, expirationDuration)

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.timeOutWhenUserPressedLogout) {
            clearTimeout(this.timeOutWhenUserPressedLogout)
        }
        this.timeOutWhenUserPressedLogout = null;
    }


    loginUser(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => { //runs the code and doesn't return anything
            this.handleuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);  // using +resData.expiresIn to convert it into number from date
        }))
    }

    private handleuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expiration = new Date(new Date().getTime() + expiresIn * 1000) //generating expiration date for user and creating the user
        const user = new User(email, userId, token, expiration);
        this.user.next(user)
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))     //saving user email and all in the localstorage to keep him/her logged in and not vanishing the data when page is refreshed
    }


    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An Unexpected Error occurred!!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);

        }
        switch (errorRes.error.error.message) {

            case 'EMAIL_EXISTS':
                errorMessage = 'This Email Already Exists Try Another email';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = "Unknown Email And Password"
                break;

            case 'INVALID_PASSWORD':
                errorMessage = "Invalid Password"
                break;

            case 'USER_DISABLED':
                errorMessage = "User Has Been Disabled By The Admin"
                break;
        }
        return throwError(errorMessage);
    }
}


