import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AddTestService } from '../../shared/services/add-test.service';
import { AddTest } from '../../shared/models/add-test';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'q-create-tests',
  templateUrl: 'create-tests.component.html',
  styleUrls: ['create-tests.component.scss']
})

export class CreateTestsComponent implements OnInit, OnDestroy {

  public sub: Subscription;
  public tests: AddTest[] = [];
  public keys: any[] = [];
  public newArrayAnswers: any[] = [];
  public newArrayQuestions: any[] = [];
  public testItem: any;

  constructor(private addTestService: AddTestService) {

  }

  public ngOnInit() {
    this.sub = this.addTestService.getTests().subscribe((res) => {
      this.tests = [];
      res.forEach((el) => {
        this.keys.push(el.$key);
        this.testItem = el;
        this.tests.push(this.testItem);
      });
    });
  }

  public inTest(event, key) {
    console.log(key);
  }

  public deleteTest(event, key) {
    this.keys.forEach((element) => {
      if (element === key) {
        this.addTestService.removeTest(element);
      }
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
