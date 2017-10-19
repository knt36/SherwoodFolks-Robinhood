/**
 * Created by anhle on 10/14/17.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'top-bar',
    templateUrl : './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent {

    accountSummary = [
        {   name:"porfolio value",
            value : "37,466.18"
        },
        {   name: "today profit",
            value: "+3214.18 (11.5%)",
            gain: "up"
        },
        {
            name: "buying power",
            value: "7342.22"
        }
    ];

    constructor(){
    }
}