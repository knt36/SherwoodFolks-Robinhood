import {Component} from '@angular/core';
import {RobinhoodDataService} from "../../services/RobinhoodDataService";
import {Router} from "@angular/router";
import {HomeComponent} from "../home.component";
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

    constructor(public router: Router, public robinhoodDataService: RobinhoodDataService) {

    }

     public clickLogin(){
      console.log("Logging in");
      this.router.navigateByUrl("home");
    }

}
