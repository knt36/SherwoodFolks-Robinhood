/**
 * Created by anhle on 8/5/17.
 */
import {Component, OnInit} from "@angular/core";
import {PositionList} from "../../mock";
import {RobinhoodService} from "../../services/RobinhoodService";

@Component({
    selector: 'positions',
    templateUrl : './positions.component.html',
    styleUrls: ['positions.component.scss'],

})


export class AllPositionComponent{

    positionList:any[] = [];
    portfolioSummary:any[] = [];

constructor(){

}
}
