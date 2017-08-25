import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { AddTestService } from '../../shared/services/add-test.service';
import { Subscription } from 'rxjs/Subscription';
import { AddTest } from '../../shared/models/add-test';
import { ActivatedRoute } from '@angular/router';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'detail-test',
  templateUrl: 'detail-test.component.html',
  styleUrls: ['detail-test.component.scss']
})

export class DetailTestComponent implements OnInit, OnDestroy {
  public key: any[] = [];
  public id: string;
  public sub: Subscription;
  public tests: AddTest[] = [];
  public questions: any[] = [];

  constructor(private addTestService: AddTestService,
              private route: ActivatedRoute,
              @Optional() @Inject(MD_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sub = this.addTestService.getOneTest(this.id).subscribe((data) => {
      this.questions = [];
      for (let key in data) {
        if (key !== 'name_test') {
          this.questions.push(key);
          this.key.push(key);
        }
      }
      console.log(data);
    });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
