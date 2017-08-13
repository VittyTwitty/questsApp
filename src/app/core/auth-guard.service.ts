import { Injectable } from '@angular/core';
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    RouterStateSnapshot, 
    Router, 
    CanDeactivate 
} from '@angular/router';
import { AuthService } from "../core/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url
        console.log('true')
        return this.checkLogin(url);
    }
    public checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/sign-in']);
        return false;
    }
}