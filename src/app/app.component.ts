import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 4 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';
}
