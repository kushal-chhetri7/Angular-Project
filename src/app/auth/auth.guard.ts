import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.authService.user.pipe((take(1)), map(user => {  //using take 1 to take the latest user value and avoid bugs
            const isAuth = !user ? false : true
            if (isAuth) {
                return true
            }


            return this.router.createUrlTree(['/auth'])   //using UrlTree to redirect the user to auth page if he tries to acces the recipe page without login or registering
        }));

    }

}

