import { Injectable } from '@angular/core';

@Injectable()
export class CountService {

    constructor() { }

    public count;

    get() {
        return this.count;
    }

    increment() {
        this.count++;
    }

}