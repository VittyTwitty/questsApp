import { Injectable } from '@angular/core';

@Injectable()
export class CountService {
  public count;

  public get () {
    return this.count;
  }

  private increment() {
    this.count++;
  }
}
