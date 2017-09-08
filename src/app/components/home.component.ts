import {Component} from '@angular/core';
import {RobinhoodDataService} from "../services/RobinhoodDataService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],

})
export class HomeComponent {
  title = 'app';

  public loginModel = {
    username: "",
    password: ""
  }

  constructor(public robinhoodDataService: RobinhoodDataService) {

  }
}
