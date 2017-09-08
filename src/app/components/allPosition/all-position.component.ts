/**
 * Created by anhle on 8/5/17.
 */
import {Component, OnInit} from "@angular/core";
import {PositionList} from "../../mock";
import {RobinhoodDataService} from "../../services/RobinhoodDataService";

@Component({
    selector: 'all-position',
    templateUrl : './all-position.component.html',
    styleUrls: ['all-position.component.scss'],

})


export class AllPositionComponent{

    positionList:any[] = [];
    portfolioSummary:any[] = [];

    constructor(robinhoodService:RobinhoodDataService){
        this.positionList = robinhoodService.positionList;

        this.portfolioSummary = [
            {
                name: 'portfolio value',
                value: '1234323.21'
            },
            {
                name: 'buying power',
                value: '1233.21'
            },
            {
                name: 'withdrawable cash',
                value: '234323.21'
            }
        ]
    }
}
