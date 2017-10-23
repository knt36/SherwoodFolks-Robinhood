import {Component, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import {RobinhoodService} from "../services/RobinhoodService";

/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],

})



export class HomeComponent implements OnInit {

  title = 'app';

  public loginModel = {
    username: "",
    password: ""
  }



  constructor(public router: Router, public rh: RobinhoodService) {

  }

  ngOnInit(): void {
    if(this.rh.isAlreadyLoggedOn()){
      this.rh.startService().then(res=>{
        console.log("Started robinhood service susccess!");
      })
    }else{
      this.router.navigateByUrl("login");
    }
  }

  logout(){
    this.rh.logout().then(res=>{
      this.router.navigateByUrl("login");
    },error=>{
      this.router.navigateByUrl("login");
    })
  }
}
