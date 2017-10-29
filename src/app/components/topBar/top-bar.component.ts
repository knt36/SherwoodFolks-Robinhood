/**
 * Created by anhle on 10/14/17.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";
import {Constant} from "../../model/constant";

@Component({
    selector: 'top-bar',
    templateUrl : './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent {
  @Output() public searchStringEmitter:EventEmitter<any> = new EventEmitter<any>();

  public searchText = "";
    isSearch:boolean = false;
    searchResult:any;
    instrument = Constant.INSTRUMENT;

    accountSummary = [
        {   name:"porfolio value",
            value : 0
        },
        {   name: "today profit",
            value: 0,
            gain: ""
        },
        {
            name: "buying power",
            value: 0
        }
    ];

    constructor(public rb:RobinhoodService){
    }

    onSearchChange(searchText:string){
      this.searchStringEmitter.emit(this.searchText);
      this.loadSearchSuggestions(searchText);
    }

    loadSearchSuggestions(searchText){
        if(searchText !== ""){
            this.isSearch = true;
            this.rb.queryStock(searchText).then(res=>{

                res.results.forEach( stock => {
                    if(this.isInPositions(stock[Constant.INSTRUMENT.SYMBOL])){
                        stock.action = Constant.QUERY_ACTION.INPOSITION;
                    } else if(this.isInWatchList(stock[Constant.INSTRUMENT.SYMBOL])){
                        stock.action = Constant.QUERY_ACTION.WATCHING;
                    } else {
                        stock.action = Constant.QUERY_ACTION.UNWATCH;
                    }
                });

                this.searchResult = res.results;
            })
        } else {
            this.isSearch = false;
            this.searchResult = null;
        }

    }

    isInWatchList(symbol){
        return this.rb.account.watchList.hasOwnProperty(symbol);
    }

    isInPositions(symbol){
        return this.rb.account.positions.hasOwnProperty(symbol);
    }

    isSearchNotFound(){
        return this.isSearch && (this.searchResult == null || this.searchResult.length === 0);
    }

    toggleStock(instrument){
        console.log('click');
        if(instrument.action === Constant.QUERY_ACTION.WATCHING){
            this.unwatchStock(instrument);
        } else {
            this.watchStock(instrument);
        }
    }

    watchStock(instrument){

        console.log('watch');
        this.rb.addStockToWatchList(instrument).then(res => {
            console.log('watch works');
            instrument.action = Constant.QUERY_ACTION.WATCHING;
        });
    }

    unwatchStock(instrument){

        console.log('unwatch');
        this.rb.removeStockFromWatchList(instrument).then(res =>{
            console.log('unwatch works');
            instrument.action = Constant.QUERY_ACTION.UNWATCH;
        });

    }


    getPortfolioDisplay(){
      if(this.rb.account.information== null || this.rb.account.information.portfolio == null){
        return this.accountSummary;
      }else{
        return(
          [
            {
              name: "portfolio value",
              value : this.rb.account.information.portfolio.equity || 0
            },
            {   name: "today profit",
              value: this.rb.account.information.getMonetaryProfit() || 0,
              gain: this.rb.account.information.isGain()
            },
            {
              name: "buying power",
              value: this.rb.account.information.buying_power || 0
            }
          ]
        );
      }

    }


}
