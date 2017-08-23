import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {
  public currentUser: any;

  constructor(private lsService: LocalStorageService,
              public af: AngularFireDatabase,) {
  }

  public getUser() {
    this.currentUser = this.lsService.user;
    return this.currentUser;
  }

  public getListUsers() {
    return this.af.list('/q-users');
  }

  public addUserBestAns(uid) {
    return this.af.object(`q-users/${uid}/tests`);
  }

  public updateUserCounter(uid) {
    return this.af.object(`q-users/${uid}/tests`);
  }

  public getUserMap() {
    return this.af.list('/q-users').map((res) => {
      let currentUser = res;
      return currentUser;
    });
  }

  public getListUsersRole(uid) {
    return this.af.object(`q-users/${uid}/role`).map((res) => {
      let c = res;
      return c;
    });
  }

}
