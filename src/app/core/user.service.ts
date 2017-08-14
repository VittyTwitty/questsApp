import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class UserService {
    currentUser: any;
    constructor(private lsService: LocalStorageService) {
    }

    getUser() {
        this.currentUser = this.lsService.user
        return this.currentUser;
    }
}