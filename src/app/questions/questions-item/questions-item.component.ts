import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'q-questions-item',
    templateUrl: 'questions-item.component.html',
    styleUrls: ['questions-item.component.scss']
})

export class QuestionsItemComponent implements OnInit {
    // @Input() item;
    // @Input() i;
    public mainAnswers: any;
    constructor() {

        // console.log(this.item.answers)

    }

    ngOnInit() {

        // this.mainAnswers = this.item.answers
        // console.log(this.mainAnswers)

    }
}