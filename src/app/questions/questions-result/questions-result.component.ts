import { Component, OnInit } from '@angular/core';
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

export class QuestionsResultComponent implements OnInit {
    sub: Subscription;
    uid: any;
    public answers: number[];
    public trueAnswer;
    public falseAnswer;
    public user;
    user2;

    constructor(
        private data: SharedService,
        private userService: UserService,
        private authService: AuthService,
        public afd: AngularFireDatabase,
    ) {
        this.trueAnswer = 0;
        this.falseAnswer = 0;

        this.sub = this.userService.updateCurrentUid()
            .subscribe(res => {
                this.uid = res;
            });

    }

    ngOnInit() {
        this.answers = this.data.trueAnswers;
        console.log(this.answers);

        this.finallyResult();
        this.setUser()

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

    setUser() {
        this.userService.addUserBestAns(this.uid).set({
            countOfTests: '1',
            bestCorrectlyAnswer: this.trueAnswer,
            bestNocorrectlyAnswer: this.falseAnswer
        })
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
    }
}