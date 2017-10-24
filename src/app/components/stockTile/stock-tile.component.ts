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
        'Market', 'Limit',
      // 'Stop Limit',
      'Stop Loss'
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



    }

    ngOnInit() {
        // change this variable as later we allow users to choose their own settings
        const graphInterval = (5*60*1000);

        this.getGraphInterval = setInterval(() => {
            this.updateGraph();
        }, graphInterval);

        this.updateGraph();

      this.order = {
        quantity: 0,
        price: this.stock.instrument.quote.last_trade_price,
        type: this.orderTypes[0]
      };
    }

    ngOnDestroy(){
        clearInterval(this.getGraphInterval);
    }

    updateGraph(){
        this.rb.getHistoricalsData(this.stock.display.symbol, this.graphOptions).then( x => {
            this.historicals = x;
        });
    }

    buy(){
      console.log(this.order);
      if(this.order.type === "Market"){
        this.rb.MarketBuy(this.stock, this.order.price, this.order.quantity);
      }else if (this.order.type === "Limit"){
        this.rb.ImmediateLimitBuy(this.stock, this.order.price, this.order.quantity);
      }else if (this.order.type === "Stop Loss"){
        this.rb.StopLossBuy(this.stock, this.order.quantity, this.order.price);
      }
    }

    updatePrice(){
      this.order.price = this.stock.instrument.quote.last_trade_price;
    }
}
