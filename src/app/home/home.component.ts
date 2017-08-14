import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../core/user.service";
import { AuthService } from "../core/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'q-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    userOnl: any;
    public user: any;
    public sub: Subscription;
    public loggedInUser: boolean = true;

    constructor(
        public userService: UserService,
        public authService: AuthService
    ) {

        this.sub = this.authService.authListener()
            .subscribe(
            (data) => {
                this.loggedInUser = data;

            });
    }

    ngOnInit() {
        this.user = this.userService.getUser();
        (this.user) ? this.loggedInUser = true : this.loggedInUser = false;
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}