/**
 * Created by anhle on 10/14/17.
 */
import {Component} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";

@Component({
    selector: 'top-bar',
    templateUrl : './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent {

    public searchText = "";

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

    constructor(public rb:RobinhoodService){

    }

    loadSearchSuggestions(searchText){
      this.rb.queryStock(searchText).then(res=>{
        console.log(res);
      })
    }

}
