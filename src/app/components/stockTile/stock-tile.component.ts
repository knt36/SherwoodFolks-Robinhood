/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit{

    @Input('stock') position: any;
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
