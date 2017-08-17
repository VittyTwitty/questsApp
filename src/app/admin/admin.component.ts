import { Component, OnInit } from '@angular/core';
import { QuestionService } from "../shared/questions.service";
import { UserService } from "../core/user.service";
import { User } from "../shared/models/user";


@Component({
    selector: 'q-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit {
    public arrayOfUsersBestAnsers: number[] = [];
    public usersLength: number;
    public users: User[];
    public adminData;
    public easyQuestion;
    public hardQuestion;
    public adminUsersLength: number;
    public adminUsersBestAnswer: string;
    constructor(
        private questionService: QuestionService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.questionService.getQuestionInfoFromForm()
            .subscribe(data => {
                this.adminData = this.calculateCharData(data);
                this.easyQuestion = this.getMaxOfArray(this.adminData.correctly);
                this.hardQuestion = this.getMaxOfArray(this.adminData.nocorrectly);
                this.barChartData = [
                    { data: this.adminData.nocorrectly, label: 'Неверные ответы' },
                    { data: this.adminData.correctly, label: 'Верные ответы' }
                ];
            });

        this.userService.getUserMap()
            .subscribe((users) => {
                users.forEach((element) => {
                    console.log(element.tests.bestCorrectlyAnswer)
                    this.arrayOfUsersBestAnsers.push(element.tests.bestCorrectlyAnswer);
                });
                this.adminUsersBestAnswer = this.getMaxNumber(this.arrayOfUsersBestAnsers);
                this.usersLength = users.length;
            })
    }

    getMaxNumber(number) {
        return Math.max.apply(null, number);
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