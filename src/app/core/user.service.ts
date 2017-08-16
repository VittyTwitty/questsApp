import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';

// import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    currentUser: any;
    public currentUid: any;
    constructor(
        private lsService: LocalStorageService,
        public af: AngularFireDatabase,
    ) {
    }

    getUser() {
        this.currentUser = this.lsService.user
        return this.currentUser;
    }

    getListUsers() {
        return this.af.list('/q-users');
    }

    public addUserBestAns(uid) {
        return this.af.object(`q-users/${uid}/tests`)
    }

    public updateCurrentUid() {
        if (!this.currentUid) {
            let us = this.lsService.user;

            return this.getListUsers().map(res => {
                res.forEach(element => {
                    if (us.email == element.email) {
                        this.currentUid = element.$key;
                    }
                });
                return this.currentUid;
            })
        } else {
            return Observable.of(this.currentUid);
            // return Observable.throw(this.currentUid);
        }
    }

    getUserMap() {
        return this.af.list('/q-users').map(res => {
            let currentUser = res;
            return currentUser;
        })
    }



}