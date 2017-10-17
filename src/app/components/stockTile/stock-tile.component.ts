/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {StockModule} from "../../services/Stock.model";
import Stock = StockModule.Stock;

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit{

    @Input('stock') stock: Stock;
    statusIcon: string;
    color: string;

    ngOnInit() {


    }
}
