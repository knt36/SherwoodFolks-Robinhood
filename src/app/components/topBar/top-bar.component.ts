/**
 * Created by anhle on 10/14/17.
 */
import {Component} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";
import {Constant} from "../../model/constant";

@Component({
    selector: 'top-bar',
    templateUrl : './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent {

    public searchText = "";
    isSearch:boolean = false;
    searchResult:any;
    instrument = Constant.INSTRUMENT;

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
        if(searchText !== ""){
            this.isSearch = true;
            this.rb.queryStock(searchText).then(res=>{
                console.log(res);
                this.searchResult = res.results;
            })
        } else {
            this.isSearch = false;
            this.searchResult = null;
            console.log("search bar empty");
        }

    }

    isSearchNotFound(){
        return this.isSearch && (this.searchResult == null || this.searchResult.length === 0);
    }

    addStockToWatchList(stock){

    }


}
