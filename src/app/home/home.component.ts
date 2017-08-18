import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../core/user.service";
import { AuthService } from "../core/auth.service";
import { Subscription } from "rxjs/Subscription";
import { SharedService } from "../shared/services/shared.service";
import { CountService } from "../shared/services/count.service";

@Component({
    selector: 'q-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    r: boolean = false;
    userAnswers: any;
    sub2: Subscription;
    userOnl: any;
    public user: any;
    public sub: Subscription;
    public loggedInUser: boolean = true;

    constructor(
        public userService: UserService,
        public authService: AuthService,
        public countService: CountService
    ) {


    }

    ngOnInit() {
        this.sub = this.authService.authListener()
            .subscribe(
            (data) => {
                this.user = this.userService.getUser();
                if (this.user.uid === 'kQvVa3wF3VPJg2SVolGQsOOiHwy1') {
                    this.r = true;
                } else {
                    this.r = false;
                }
                (this.user) ? this.loggedInUser = true : this.loggedInUser = false;

            });


        this.sub2 = this.userService.getUserMap()
            .subscribe(res => {
                res.forEach(element => {
                    if (this.user) {
                        if (element.$key == this.user.uid) {
                            this.userAnswers = element;
                            console.log(this.userAnswers);
                        }

                    }
                });
            })

    }

    counter() {
        this.countService.count = this.userAnswers.tests.countOfTests;
        this.countService.count++;
        console.log(this.countService.count, 'this.countService.count')

    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }

    public adminId() {
        return true;
    }
}