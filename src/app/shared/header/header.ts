import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../core/user.service";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'q-header',
    templateUrl: 'header.html',
    styleUrls: ['header.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
    userOnl: any;
    user: any;
    public sub: Subscription;
    public loggedInUser: boolean = false;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {
        this.sub = this.authService.authListener()
            .subscribe(
            (data) => {
                this.loggedInUser = data;

            });
    }

    ngOnInit() {
        this.user = this.userService.getUser();
        this.loggedInUser = (this.user) ? true : false;
        console.log('this.loggedInUser', this.loggedInUser)
        console.log('this.userOnl', this.user)
    }

    logOut() {
        this.authService.logout()
            .then(res => {
                console.log('this.loggedInUser', this.loggedInUser)
                console.log('this.userOnl', this.user)
                this.router.navigate(['/']);
            });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

}