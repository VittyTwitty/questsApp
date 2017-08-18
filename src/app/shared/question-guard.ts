import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
    CanDeactivate
} from '@angular/router';
import { AuthService } from "../core/auth.service";
import { UserService } from "../core/user.service";

@Injectable()
export class QuestionGuard implements CanActivate {
    public user;
    constructor(
        private authService: AuthService,
        private router: Router,
        public userService: UserService,
    ) {

    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url
        console.log('true')
        return this.checkLogin(url);
    }
    public checkLogin(url: string): boolean {
        this.authService.authListener()
            .subscribe(
            (data) => {
                this.user = this.userService.getUser();

                if (this.user) {
                    console.log('GOGO', this.user)
                    return true;
                } else {
                    this.router.navigate(['/']);
                    console.log('NO GOGO', this.user);
                    return false;
                }
                
            });
            return true;
    }

}