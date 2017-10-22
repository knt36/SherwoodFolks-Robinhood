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
            value : "loading"
        },
        {   name: "today profit",
            value: "loading",
            gain: "up"
        },
        {
            name: "buying power",
            value: "loading"
        }
    ];

    constructor(public rb:RobinhoodService){

    }

    loadSearchSuggestions(searchText){
      this.rb.queryStock(searchText).then(res=>{
        console.log(res);
      })
    }

    getPortfolioDisplay(){
      if(this.rb.account.information== null || this.rb.account.information.portfolio == null){
        return this.accountSummary;
      }else{
        return(
          [
            {
              name:"porfolio value",
              value : this.rb.account.information.portfolio.equity
            },
            {   name: "today profit",
              value: this.rb.account.information.getMonetaryProfit(),
              gain: this.rb.account.information.isGainOrLoss()
            },
            {
              name: "buying power",
              value: this.rb.account.information.buying_power
            }
          ]
        )
      }

    }


}
