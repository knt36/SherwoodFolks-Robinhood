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
    filterName = "";
    watchList = [];
    selectedStock:any = null;

    public loginModel = {
        username: "",
        password: ""
    }

    public hideOrderPanel:boolean = false;
    public showStockPanel:boolean = false;

    constructor(public router: Router, public rb: RobinhoodService) {
        // this.positions = this.rb.account.positions;
        // this.watchList = this.rb.account.watchList;
        this.Object = Object;
    }

    onSearchStringEmitter(event){
      this.filterName = event.toLowerCase().trim();
    }

    toggleOrderPanel(){
      this.hideOrderPanel = !this.hideOrderPanel;
    }

    closeStockPanel(event){
      this.showStockPanel = false;
    }

    openStockPanel(event){
      this.showStockPanel = true;
    }


}
