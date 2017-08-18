import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {
    currentUser: any;
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
    public updateUserCounter(uid) {
        return this.af.object(`q-users/${uid}/tests`)
            .map(res => {
                console.log('res = ', res)
                
            })
    }

    getUserMap() {
        return this.af.list('/q-users').map(res => {
            let currentUser = res;
            return currentUser;
        })
    }

    getListUsersRole(uid) {
        return this.af.object(`q-users/${uid}/role`).map(res => {
            let c = res;
            return c;
        });
    }



}