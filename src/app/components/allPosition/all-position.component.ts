/**
 * Created by anhle on 8/5/17.
 */
import {Component, OnInit} from "@angular/core";
import {PositionList} from "../../mock";

@Component({
    selector: 'all-position',
    templateUrl : './all-position.component.html',
    styleUrls: ['./all-position.component.css']
})


export class AllPositionComponent implements OnInit{

    positionList:any[] = [];

    ngOnInit() {
        this.positionList = PositionList;
    }
}