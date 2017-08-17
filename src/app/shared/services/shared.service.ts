import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserService } from "../../core/user.service";
import { AuthService } from "../../core/auth.service";

@Injectable()
export class SharedService {
    public user: any;
    public trueAnswers: any;
    public answersForChart: any;

    public counter: number;
    // private qqq = new BehaviorSubject<string>('vitalik');
    // currentQqq = this.qqq.asObservable();
    constructor(private userService: UserService, private authService: AuthService) {
        this.authService.authListener()
            .subscribe(
            (data) => {
                this.user = this.userService.getUser();

            });

    }



}