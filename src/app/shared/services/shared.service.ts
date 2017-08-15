import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SharedService {
    public trueAnswers: any;
    public answersForChart: any;
    // private qqq = new BehaviorSubject<string>('vitalik');
    // currentQqq = this.qqq.asObservable();
    constructor() { }

    
}