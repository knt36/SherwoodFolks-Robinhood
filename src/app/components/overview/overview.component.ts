import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {RobinhoodService} from "../../services/RobinhoodService";
/**
 * Created by roy_f on 7/31/2017.
 */

@Component({
    templateUrl: './overview.component.html',
    styleUrls: ['overview.component.scss'],

})
export class OverviewComponent {
    Object = null;
    positions = [
        {
            symbol: 'SQ',
            price: 260.12,
            gain: 'up',
            percentChange : "+0.04 (0.12%)",
            totalProfit: 360.23,
            percentReturn: "+0.002 (0.04%)",
            quantity: 23,
            averageCost: 221.45,
            data: []
        }
    ];
    filterName = "";
    watchList = [];

    public loginModel = {
        username: "",
        password: ""
    }

    private hidePanel:boolean = false;

    constructor(public router: Router, public rb: RobinhoodService) {
        // this.positions = this.rb.account.positions;
        // this.watchList = this.rb.account.watchList;
        this.Object = Object;
    }

    onSearchStringEmitter(event){
      this.filterName = event.toLowerCase().trim();
    }

    togglePanel(){
      this.hidePanel = !this.hidePanel;
    }

}
