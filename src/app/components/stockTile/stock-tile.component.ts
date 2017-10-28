/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnDestroy, OnChanges} from "@angular/core";
import {StockModule} from "../../model/Stock.model";
import Stock = StockModule.Stock;
import {RobinhoodService} from "../../services/RobinhoodService";
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit, OnChanges{

    @Input('stock') stock: Stock;

    public order;
    orderTypes = [
        'Limit', 'Market',
      // 'Stop Limit',
      'Stop Loss'
    ];

    public display={
      symbol:"loading",
      price: "loading",
      priceClass:"",
      dailyPercentChange:"loading",
      dailyPercentChangeClass:"",
      text1:{
        title: "Total Profit",
        info:"",
        class:""
      },
      text2:{
        title: "Percent Return",
        info:"",
        class:""
      },
      text3:{
        title: "Shares",
        info:"",
        class:""
      },
      text4:{
        title: "Avg Cost",
        info:"",
        class:""
      }
    }


    constructor(public decimalPipe: DecimalPipe,public rb:RobinhoodService){
    }

    ngOnChanges(){
      this.setDisplay();
    }

    ngOnInit() {
      this.order = {
        quantity: 1,
        price: this.stock.instrument.quote.last_trade_price,
        type: this.orderTypes[0]
      };
    }

    setDisplay(){
      this.display.symbol = this.stock!= null? this.stock.instrument.symbol: "loading";
      this.display.price = this.stock!= null?
        this.decimalPipe.transform(this.stock.instrument.quote.last_trade_price, '1.2'): "loading";
      this.display.dailyPercentChange = this.stock!= null? this.stock.display.percent_change: "loading";
      this.display.dailyPercentChangeClass = this.stock!= null? this.stock.display.stock_gain: "loading";
      this.display.text1.info = this.stock!=null?
        "$" + this.decimalPipe.transform(this.stock.display.total_profit, '1.2'): "loading";
      this.display.text2.info = this.stock!= null? "%" + this.stock.display.percent_return: "loading";
      this.display.text1.class = this.stock!=null? this.stock.display.is_profit: "loading";
      this.display.text3.info = this.stock!= null? this.stock.display.quantity + "": "loading";
      this.display.text4.info = this.stock!= null? "$" + this.stock.display.avg_cost: "loading";
    }

    /**
     * need to have another field to do stop limit buy
     * TODO: add logic to stop limit buy
     */
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

    sell(){
        if(this.order.type === "Market"){
            this.rb.MarketSell(this.stock, this.order.price, this.order.quantity);
        }else if (this.order.type === "Limit"){
            this.rb.ImmediateLimitSell(this.stock, this.order.price, this.order.quantity);
        }else if (this.order.type === "Stop Loss"){
            this.rb.StopLossSell(this.stock, this.order.quantity, this.order.price);
        }
    }



    /**
     * Need to round the price to 2 decimal points or Robinhood will not take the order
     * for stock with price > $1
     */
    updatePrice(){
      this.order.price = Number(this.stock.instrument.quote.last_trade_price).toFixed(2);
    }

}
