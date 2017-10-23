/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnChanges} from "@angular/core";
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


export class StockTileComponent implements OnInit, OnChanges{

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
        bound: Constant.Graph.BOUND.EXTENDED
    };

    constructor(public rb:RobinhoodService){
      this.order = {
        quantity: 0,
        price: 234.12,
        totalValue: 0,
        type: this.orderTypes[0]
      };

    }


    ngOnInit() {
        this.rb.getHistoricalsData(this.stock.display.symbol, this.graphOptions).then( x => this.historicals = x);

        this.updateTime();
    }

    ngOnChanges(){
        console.log('stock on change');
        const currentTime = new Date();
        if(this.historicals && currentTime > this.nextUpdateTime){

            console.log('updating stock price');

            this.historicals.updateData(this.stock.display.price);
            this.updateTime(currentTime);
        }
    }

    updateTime(date:Date=null){
        //const interval = this.graphOptions.interval === Constant.Graph.INTERVAL.FIVE_M ? (5*60*1000) : 0;
        const interval = this.graphOptions.interval === Constant.Graph.INTERVAL.FIVE_M ? (5000) : 0;

        this.lastUpdateTime = date ? date : new Date();
        this.nextUpdateTime = new Date(this.lastUpdateTime.getTime() + interval);
    }
}
