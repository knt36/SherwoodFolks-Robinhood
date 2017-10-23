/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {StockModule} from "../../model/Stock.model";
import Stock = StockModule.Stock;
import {GraphData} from "../../model/Historical.model";
import {RobinhoodService} from "../../services/RobinhoodService";
import {Constant} from "../../model/constant";

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit, OnDestroy{

    @Input('stock') stock: Stock;

    public order;
    orderTypes = [
        'Market', 'Limit', 'Stop Limit', 'Stop Loss'
    ];
    historicals:GraphData;
    lastUpdateTime:Date;
    nextUpdateTime:Date;
    graphOptions:any = {
        interval: Constant.Graph.INTERVAL.FIVE_M,
        span: Constant.Graph.SPAN.DAY,
        bound: Constant.Graph.BOUND.REGULAR
    };
    getGraphInterval:any;

    constructor(public rb:RobinhoodService){
      this.order = {
        quantity: 0,
        price: 234.12,
        totalValue: 0,
        type: this.orderTypes[0]
      };


    }


    ngOnInit() {
        const graphInterval = (5*60*1000);

        this.getGraphInterval = setInterval(() => {
            this.updateGraph();
        }, graphInterval);

        this.updateGraph();
    }

    ngOnDestroy(){
        clearInterval(this.getGraphInterval);
    }

    updateGraph(){
        this.rb.getHistoricalsData(this.stock.display.symbol, this.graphOptions).then( x => this.historicals = x);
    }
}
