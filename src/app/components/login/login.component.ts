import {Component} from '@angular/core';
import {RobinhoodDataService} from "../../services/RobinhoodDataService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],

})
export class LoginComponent {
    title = 'app';

    public loginModel = {
        username: "",
        password: ""
    }

    constructor(public robinhoodDataService: RobinhoodDataService) {

    }
}