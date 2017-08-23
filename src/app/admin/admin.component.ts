import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../shared/questions.service';
import { UserService } from '../core/user.service';
import { User } from '../shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'q-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})

export class AdminComponent {

}
