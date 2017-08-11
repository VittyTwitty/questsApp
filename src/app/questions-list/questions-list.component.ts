import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
    selector: 'q-question-list',
    templateUrl: 'questions-list.component.html',
    styleUrls: ['questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
    user: Observable<firebase.User>;
    items: FirebaseListObservable<any[]>;
    msgVal: string = '';

    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
        this.items = af.list('/questions', {
            query: {
                limitToLast: 50
            }
        });

        this.user = this.afAuth.authState;
        // console.log()
    }

    ngOnInit() { }
}