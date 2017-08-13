import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Injectable()
export class QuestionService {
    user: Observable<firebase.User>;
    items: FirebaseListObservable<any[]>;
    msgVal: string = '';

    constructor(
        public afAuth: AngularFireAuth,
        public af: AngularFireDatabase) {
        this.user = this.afAuth.authState;
    }

    getQuestion() {
        return this.af.list('/questions', {
            query: {
                limitToLast: 5
            }
        });        
    }
  
}