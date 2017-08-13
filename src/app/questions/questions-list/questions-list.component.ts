import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { QuestionService } from "../../shared/questions.service";
import { Subscription } from "rxjs/Subscription";
import { Questions } from "../../shared/models/questions";
import { Router } from "@angular/router";

@Component({
    selector: 'q-question-list',
    templateUrl: 'questions-list.component.html',
    styleUrls: ['questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
    public quest: Questions[];
    // public sub: Subscription;
    public questionId: number;
    public questionsId: number[] = [];
    public ind: number = 0;

    public radio: any;
    public button: any;
    public correctAnswer: number;
    public coorectAnswersDone: number[] = [];
    constructor(
        private questionService: QuestionService,
        private router: Router
    ) {

        this.getQuestions();

        this.radio = document.getElementsByName('radio');
        this.button = document.getElementsByClassName('s-question_submit');

    }
    ngOnInit() {
    }

    public getQuestions() {
        this.questionService
            .getQuestion()
            .subscribe((res) => {
                this.quest = [];
                res.forEach((q) => {
                    this.quest.push(q);
                });
            });
    }

    maxId(): number {
        let max: number;
        for (let i = 0; i <= this.quest.length; i++) {
            max = i;
        }
        return max - 1;
    }

    public addUncheckedRadio() {
        this.radio.forEach(element => {
            element.checked = false;
        });
    }

    public correctAnswerOrNo() {
        let radioId;
        this.radio.forEach((element, i) => {
            radioId = +element.id.slice(6)
            if (element.checked) {
                if (radioId == this.quest[this.ind].correct) {
                    console.log('Ответ верный', radioId);
                    this.coorectAnswersDone.push(this.quest[this.ind].correct);
                    console.log(this.coorectAnswersDone);
                } else {
                    this.coorectAnswersDone.push(0);
                    console.log('Ответ неверный', radioId);
                }
            }
        });
    }

    // public addDisabledButton() {
    //     this.radio.forEach(element => {
    //             console.log('sdsd')
    //         if (element.checked === false) {
    //             this.button.disabled = true;
    //             console.log('sdsd')
    //         }
    //     });
    // }

    nextAnswer() {
        if (this.ind < this.maxId()) {
            this.correctAnswerOrNo();
            this.ind++;
            this.addUncheckedRadio();
        } else {
            this.correctAnswerOrNo();
            this.ind++;
            console.log(this.maxId())
            console.log(this.coorectAnswersDone);
            this.router.navigate(['/result'])
        }

    }

    public ngOnDestroy() {
        // this.sub.unsubscribe();
    }


}