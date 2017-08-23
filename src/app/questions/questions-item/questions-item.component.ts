import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'q-questions-item',
  templateUrl: 'questions-item.component.html',
  styleUrls: ['questions-item.component.scss']
})

export class QuestionsItemComponent {
  @Input() public item;
  @Input() public i;

}
