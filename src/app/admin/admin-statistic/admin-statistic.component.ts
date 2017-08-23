import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { QuestionService } from '../../shared/questions.service';
import { User } from '../../shared/models/user';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'q-admin-statistic',
  templateUrl: 'admin-statistic.component.html',
  styleUrls: ['admin-statistic.component.scss']
})

export class AdminStatisticComponent implements OnInit {
  public items: FirebaseListObservable<any[]>;
  public arrayOfUsersBestAnsers: number[] = [];
  public usersLength: number;
  public users: User[];
  public adminData: any;
  public easyQuestion: number;
  public hardQuestion: number;
  public adminUsersBestAnswer: string;
  public showSpinner: boolean = true;
  public barChartLabels: string[] = ['1', '2', '3', '4', '5'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[];
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

  constructor(private questionService: QuestionService,
              private userService: UserService) {
  }

  public ngOnInit() {
    this.items = this.questionService.getQuestionInfoFromForm();
    this.items.subscribe((data) => {
      this.adminData = this.calculateCharData(data);
      this.easyQuestion = this.getMaxOfArray(this.adminData.correctly);
      this.hardQuestion = this.getMaxOfArray(this.adminData.nocorrectly);
      this.barChartData = [
        {data: this.adminData.nocorrectly, label: 'Неверные ответы'},
        {data: this.adminData.correctly, label: 'Верные ответы'}
      ];
      this.showSpinner = false;
    });

    this.userService.getUserMap()
      .subscribe((users) => {
        users.forEach((element) => {
          console.log(element.tests.bestCorrectlyAnswer);
          this.arrayOfUsersBestAnsers.push(element.tests.bestCorrectlyAnswer);
        });
        this.adminUsersBestAnswer = this.getMaxNumber(this.arrayOfUsersBestAnsers);
        this.usersLength = users.length;
      });
  }

  public getMaxNumber(num: number[]) {
    return Math.max.apply(null, num);
  }

  private calculateCharData(data: any[]) {
    let correctly = [];
    let nocorrectly = [];
    data.map((elem) => {
      correctly.push(elem.correctly);
      nocorrectly.push(elem.nocorrectly);
    });
    return {
      correctly,
      nocorrectly
    };
  }

  private getMaxOfArray(numArray: number[]) {
    let max = Math.max.apply(null, numArray);
    let indexOfMax = numArray.indexOf(max);
    return indexOfMax + 1;
  }

}
