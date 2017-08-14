import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'q-question-result',
    templateUrl: 'questions-result.component.html',
    styleUrls: ['questions-result.component.scss']
})

export class QuestionsResultComponent implements OnInit {
    public answers: number[];
    public trueAnswer;
    public falseAnswer;

    constructor(private data: SharedService) {
        this.trueAnswer = 0;
        this.falseAnswer = 0;
    }

    ngOnInit() {
        this.answers = this.data.trueAnswers;
        console.log(this.answers);
        this.finallyResult()
    }

    finallyResult() {
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i] != 0) {
                this.trueAnswer++;
            } else {
                this.falseAnswer++;
            }
            console.log(this.trueAnswer, this.falseAnswer)
        }
    }

    // private barChartOptions: any = {
    //     scaleShowVerticalLines: false,
    //     responsive: true
    // };
    // private barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    // private barChartType: string = 'bar';
    // private barChartLegend: boolean = true;

    // private barChartData: any[] = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // ];

    // // events
    // private chartClicked(e: any): void {
    //     console.log(e);
    // }

    // private chartHovered(e: any): void {
    //     console.log(e);
    // }
}