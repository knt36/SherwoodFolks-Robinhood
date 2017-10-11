import {Component} from '@angular/core';
import {RobinhoodDataService} from "../../services/RobinhoodDataService";
import {Router} from "@angular/router";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    templateUrl: './overview.component.html',
    styleUrls: ['overview.component.scss'],

})
export class OverviewComponent {
    title = 'app';

    public loginModel = {
        username: "",
        password: ""
    }

    constructor(public router: Router) {

    }


}
