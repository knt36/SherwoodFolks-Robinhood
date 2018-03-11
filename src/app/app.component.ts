import {Component, ViewEncapsulation} from '@angular/core';
import {RobinhoodService} from "./services/RobinhoodService";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  option = {
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxStack: 3
  }

}
