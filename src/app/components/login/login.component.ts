import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HomeComponent} from "../home.component";
import {RobinhoodService} from "../../services/RobinhoodService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],

})
export class LoginComponent implements OnInit {
    title = 'app';

    public loginModel = {
        username: "",
        password: ""
    }

    public alert={
      title: "",
      memo: "",
      show:false
    }

    constructor(public router: Router, public rh: RobinhoodService) {

    }

    ngOnInit() {
      if(this.rh.isAlreadyLoggedOn()){
        this.router.navigateByUrl("home");
      }
    }

     public clickLogin(){
      this.rh.login(this.loginModel.username, this.loginModel.password).then(res=>{
        this.router.navigateByUrl("home");
      }, error=>{
        this.alert.title = "Error";
        this.alert.memo = error.json().non_field_errors[0];
        this.alert.show = true;
      })
    }

}
