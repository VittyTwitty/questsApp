import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  public get token () {
    return JSON.parse(this.readData('token'));
  }
  public set token( data: any) {
    localStorage.setItem( 'token', this.convertToString(data));
  }
  private convertToString(data: any) {
    return JSON.stringify(data);
  }
  private readData(key: string) {
    return localStorage.getItem(key);
  }
}