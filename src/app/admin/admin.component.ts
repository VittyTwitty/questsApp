import { Component, OnInit } from '@angular/core';
import { QuestionService } from "../shared/questions.service";

@Component({
    selector: 'q-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit {
    public adminData;
    public easyQuestion;
    public hardQuestion;
    constructor(
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.questionService.getQuestionInfoFromForm()
            .subscribe(data => {
                this.adminData = this.calculateCharData(data);
                console.log(this.adminData);
                this.easyQuestion = this.getMaxOfArray(this.adminData.correctly);
                this.hardQuestion = this.getMaxOfArray(this.adminData.nocorrectly);
                console.log(this.getMaxOfArray(this.adminData.correctly));
                console.log(this.getMaxOfArray(this.adminData.nocorrectly));
                this.barChartData = [
                    { data: this.adminData.nocorrectly, label: 'Неверные ответы' },
                    { data: this.adminData.correctly, label: 'Верные ответы' }
                ];
            });
    }

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }]
        },
    };

    public barChartLabels: string[] = ['1', '2', '3', '4', '5'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    private calculateCharData(data) {
        let correctly = [];
        let nocorrectly = [];
        data.map((elem) => {
            correctly.push(elem.correctly);
            nocorrectly.push(elem.nocorrectly)
        })
        return {
            correctly,
            nocorrectly
        }
    }

    private getMaxOfArray(numArray) {
        let max = Math.max.apply(null, numArray);
        let indexOfMax = numArray.indexOf(max)
        return indexOfMax + 1;
    }
}