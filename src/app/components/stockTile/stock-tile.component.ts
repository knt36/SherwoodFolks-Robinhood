/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Stock} from "../../services/Stock.model";
import {GraphData} from "../../services/Historical.model";

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit{

    @Input('stock') stock: Stock;
    statusIcon: string;
    color: string;

    public order;

    orderTypes = [
        'Market', 'Limit', 'Stop Limit', 'Stop Loss'
    ];

    historicals:GraphData;


    ngOnInit() {
        this.order = {
            quantity: 0,
            price: 234.12,
            totalValue: 0,
            type: this.orderTypes[0]
        };

        this.historicals = {
            closePrice: 34.2,
            data: [ 32.2, 35.4, 37.4, 21.4, 22.5, 26.4, 32.2, 35.4, 37.4, 21.4, 22.5, 26.4, 32.2, 35.4, 37.4, 21.4, 22.5, 26.4]
        };

    }
}
