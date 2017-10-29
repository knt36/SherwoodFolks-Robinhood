import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HomeComponent} from "../home.component";
import {RobinhoodService} from "../../services/RobinhoodService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['contact.component.scss'],

})
export class ContactComponent implements OnInit {
  ngOnInit(): void {
  }

}
