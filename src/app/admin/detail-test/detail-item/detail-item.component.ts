import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddTestService } from '../../../shared/services/add-test.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'detail-item-component',
  templateUrl: 'detail-item.component.html',
  styleUrls: ['detail-item.component.scss']
})

export class DetailItemComponent implements OnInit, OnDestroy, AfterViewInit {
  public selfQuestion: any;
  @Input() public question;
  @Input() public id;
  @Input() public i;
  public sub: Subscription;

  constructor(private addTestsService: AddTestService) {

  }

  public ngOnInit() {

    this.sub = this.addTestsService.getQuestion(this.id, this.question).subscribe((res) => {
      this.selfQuestion = res;
    });

  }

  public ngAfterViewInit() {
    console.log(this.question);
  }

  public deleteQuestion(keyOfQuestion) {
    this.addTestsService.getQuestion(this.id, keyOfQuestion)
    this.addTestsService.removeQuestion();

  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
