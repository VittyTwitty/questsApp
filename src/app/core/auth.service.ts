import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {
    public isLoggedIn = false;
    public redirectUrl: string;
    public subject = new BehaviorSubject(this.loggedIn());

    public user: Observable<firebase.User>;
    constructor(
        public afa: AngularFireAuth,
        public afd: AngularFireDatabase,
        private router: Router,
        private lSService: LocalStorageService
    ) {
        this.user = afa.authState;
    }

    public register(email: string, password: string) {
        return this.afa
            .auth
            .createUserWithEmailAndPassword(email, password)

    }

    public addUserInfoFromForm(uid, email: string, password: string) {
        return this.afd.object('q-users/' + uid).set({
            email: email,
            password: password
        })
    }
    public login(email: string, password: string) {
        return this.afa
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                this.lSService.user = res;
                this.isLoggedIn = true;
            })
            .catch(error => {
                alert('Idi regaysia');
            })
    }
    // loginGoogle() {
    //     this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //         .then(res => {
    //             alert('Google in');
    //         })
    //         .catch(error => {
    //             alert('dont in');
    //         })
    // }

    public logout() {
        return this.afa
            .auth
            .signOut()
            .then(res => {
                this.lSService.deleteLocalUser();
                this.isLoggedIn = false;
                this.signInListener();

            })
            .catch(error => {
            })
    }

    public signInListener() {
        if (this.lSService.user) {
            return this.subject.next(true);
        } else {
            localStorage.removeItem('auth_token');
            return this.subject.next(false);
        }
    }

    public authListener(): Observable<any> {
        let subAsObservable = this.subject.asObservable();
        return subAsObservable;
    }
    public loggedIn() {
        return !!this.lSService.user;
    }

}