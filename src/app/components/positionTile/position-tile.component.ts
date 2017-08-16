/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'position-tile',
    templateUrl : './position-tile.component.html',
    styleUrls: ['./position-tile.component.scss']
})


export class PositionTileComponent implements OnInit{

    @Input('position') position: any;
    statusIcon: string;
    color: string;

    ngOnInit() {
        if(this.position.status == 'up'){
            this.statusIcon = 'glyphicon-arrow-up';
            this.color = 'green';
        } else {
            this.statusIcon = 'glyphicon-arrow-down';
            this.color = 'red';
        }

    }
}
