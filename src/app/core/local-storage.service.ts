import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public get user() {
    return (JSON.parse(localStorage.getItem('user')));
  }

  public set user(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  public deleteLocalUser() {
    localStorage.removeItem('user')
  }
}
