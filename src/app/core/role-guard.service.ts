import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RoleGuard implements CanActivate {
    user2: Observable<any>;
    r: any;
    user: any;
    sub2: any;
    sub: any;

    constructor(
        public userService: UserService,
        public authService: AuthService,
        private router: Router
    ) {


    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;



        return this.checkLogin(url);
    }

    public checkLogin(url: string): boolean {
        // if (this.user) {
        this.authService.authListener()
            .subscribe(
            (data) => {
                this.user = this.userService.getUser();
                this.r = this.user.uid;
                console.log(this.r)
            });

        // }


        console.log('this.userthis.userthis.user', this.user)
        if (this.r == 'kQvVa3wF3VPJg2SVolGQsOOiHwy1') {
            console.log('this.r', this.r)
            return true;
        } else {
            this.router.navigate(['/']);
            console.log('Unauthorized to open link:');
            return false;
        }
    }

}