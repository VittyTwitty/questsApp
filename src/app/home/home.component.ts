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
    userAnswers: any;
    sub2: Subscription;
    userOnl: any;
    public user: any;
    public sub: Subscription;
    public loggedInUser: boolean = true;

    constructor(
        public userService: UserService,
        public authService: AuthService
    ) {


    }

    ngOnInit() {
        this.sub = this.authService.authListener()
            .subscribe(
            (data) => {
                this.user = this.userService.getUser();
                (this.user) ? this.loggedInUser = true : this.loggedInUser = false;
                
            });


        this.sub2 = this.userService.getUserMap()
            .subscribe(res => {
                res.forEach(element => {
                    if(element.$key == this.user.uid) {
                        this.userAnswers = element;
                        console.log(this.userAnswers)
                    }
                });
            })

    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }
}