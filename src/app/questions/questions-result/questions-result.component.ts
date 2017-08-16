import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { UserService } from "../../core/user.service";
import { AuthService } from "../../core/auth.service"
import { AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'q-question-result',
    templateUrl: 'questions-result.component.html',
    styleUrls: ['questions-result.component.scss']
})

export class QuestionsResultComponent implements OnInit, OnDestroy {
    currentUserAnswers: any;
    sub2: Subscription;
    sub: Subscription;
    uid: any;
    public answers: number[];
    public trueAnswer;
    public falseAnswer;
    public user;
    user2;
    public counter;

    constructor(
        private data: SharedService,
        private userService: UserService,
        private authService: AuthService,
        public afd: AngularFireDatabase,
    ) {
        this.trueAnswer = 0;
        this.falseAnswer = 0;

        // this.sub = this.userService.updateCurrentUid()
        //     .subscribe(res => {
        //         this.uid = res;
        //         console.log(this.uid)
        //     });
        this.sub = this.authService.authListener()
            .subscribe(
            (data) => {
                console.log(data, 'data')
                this.user = this.userService.getUser();
                this.uid = this.user.uid;
            });
        this.sub2 = this.userService.getUserMap()
            .subscribe(res => {
                res.forEach(element => {
                    if (element.$key == this.user.uid) {

                        this.currentUserAnswers = element.tests;
                        this.counter = this.currentUserAnswers.countOfTests;

                        this.setUser(this.trueAnswer, this.falseAnswer);
                        console.log(this.currentUserAnswers)
                    }
                });
            })

    }

    ngOnInit() {
        // this.sub2 = this.userService.getUserMap()
        //     .subscribe(res => {
        //         this.user = res;
        //     })
        this.answers = this.data.trueAnswers;

        // this.counter = this.currentUserAnswers.countOfTests;
        this.finallyResult();



    }



    finallyResult() {
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i] != 0) {
                this.trueAnswer++;
            } else {
                this.falseAnswer++;
            }
        }

    }

    setUser(trueA, falseA) {
        if (this.currentUserAnswers.bestCorrectlyAnswer <= trueA) {
            trueA = trueA;

        } else {
            trueA = this.currentUserAnswers.bestCorrectlyAnswer;
        }
        if (this.currentUserAnswers.bestNocorrectlyAnswer <= falseA) {
            falseA = falseA;

        } else {
            falseA = this.currentUserAnswers.bestNocorrectlyAnswer;
        }







        this.userService.addUserBestAns(this.uid).set({
            countOfTests: this.counterMeth(this.counter),
            bestCorrectlyAnswer: trueA,
            bestNocorrectlyAnswer: falseA
        })
    }

    public counterMeth(count) {
        let c = count;
        return c++;
    }

    public smallerBigest(pervios, next) {
        if (pervios < next) {
            return next;
        } else {
            return pervios;
        }
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }
}