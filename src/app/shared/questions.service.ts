import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class QuestionService {
  public user: Observable<firebase.User>;
  public items: FirebaseListObservable<any[]>;
  public msgVal: string = '';

  constructor(public afAuth: AngularFireAuth,
              public af: AngularFireDatabase,) {
    this.user = this.afAuth.authState;
  };

  public getQuestion() {
    return this.af.list('/questions');
  }

  public getOneQuestion(key): FirebaseListObservable<any[]> {
    return this.af.list(`/questions/${key}`);
  }

  public getQuestionInfoFromForm() {
    return this.af.list('q-answers/');
  }

  public addQuestionInfoFromForm(i: number, i2: number, i3: number) {
    return this.af.object('q-answers/' + i).set({
      correctly: i2,
      nocorrectly: i3
    });
  }

  public getSnapshotQuestionInfoFromForm() {
    return this.af.list('q-answers/');
  }

}
