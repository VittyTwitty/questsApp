import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";
import { AngularFireDatabase } from "angularfire2/database";

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
}