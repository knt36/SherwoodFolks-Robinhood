/**
 * Created by anhle on 8/5/17.
 */
import {Component, OnInit, Input} from "@angular/core";
import { WatchList} from "../../mock";
import {RobinhoodDataService} from "../../services/RobinhoodDataService";

@Component({
    selector: 'watch-list',
    templateUrl : './watch-list.component.html',
    styleUrls: ['./watch-list.component.css']
})


export class WatchListComponent {

  watchList: any[];
  constructor(robinhoodService: RobinhoodDataService){
    this.watchList = robinhoodService.watchList;
  }
}
