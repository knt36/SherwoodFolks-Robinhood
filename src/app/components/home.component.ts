import {Component} from '@angular/core';
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'app';

  public loginModel = {
    username: "",
    password: ""
  }

  constructor() {

  }
}
