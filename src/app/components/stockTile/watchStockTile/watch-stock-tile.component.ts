/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter} from "@angular/core";
import Stock = StockModule.Stock;
import {DecimalPipe} from "@angular/common";
import {RobinhoodService} from "../../../services/RobinhoodService";
import {StockModule} from "../../../model/Stock.model";
import {Constant} from "../../../model/constant";
import StockType = StockModule.StockType;

@Component({
  selector: 'watch-stock-tile',
  templateUrl : '../stock-tile.component.html',
  styleUrls: ['../stock-tile.component.scss']
})


export class WatchStockTileComponent implements OnInit, OnChanges{

  @Input('stock') stock: Stock;
  @Output()
  showPanel:EventEmitter<string> = new EventEmitter();

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
      title: "Missed Profit",
      info:"",
      class:""
    },
    text2:{
      title: "Sold Price % Diff",
      info:"",
      class:""
    },
    text3:{
      title: "Shares Sold",
      info:"",
      class:""
    },
    text4:{
      title: "Sold Price",
      info:"",
      class:""
    },
    leftButton:{
      label:"Unwatch"
    },
    rightButton:{
      label:"Buy"
    }
  }

  public StockType = null;
  constructor(public decimalPipe: DecimalPipe,public rb:RobinhoodService){
    this.StockType = StockType;
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
    this.setDisplay();
  }

  setDisplay(){
    const lastOrder = this.stock!=null ? this.stock.getLastSoldOrder(): null;
    const missedProfit = this.stock!= null && lastOrder!= null?
      this.decimalPipe.transform((Number.parseFloat(this.stock.instrument.quote.last_trade_price)
        * Number.parseInt(lastOrder.cumulative_quantity))-
        (Number.parseFloat(lastOrder.average_price) * Number.parseInt(lastOrder.cumulative_quantity))
        , '1.2')
       : null;

    const soldPricePercentDiff = this.stock!=null && lastOrder!=null?
      this.decimalPipe.transform(((Number.parseFloat(this.stock.instrument.quote.last_trade_price)
        - (Number.parseFloat(lastOrder.average_price)))/
        Number.parseFloat(lastOrder.average_price)) * 100,'1.2')
      : null;

    this.display.symbol = this.stock!= null? this.stock.instrument.symbol: "loading";
    this.display.price = this.stock!= null?
      this.decimalPipe.transform(this.stock.instrument.quote.last_trade_price, '1.2'): "loading";
    this.display.dailyPercentChange = this.stock!= null? this.stock.display.percent_change: "loading";
    this.display.dailyPercentChangeClass = this.stock!= null? this.stock.display.stock_gain: "loading";

    this.display.text1.info = missedProfit!=null? "$" + missedProfit: "none";
    this.display.text1.class = missedProfit!=null?(Number.parseFloat(missedProfit)<0?Constant.COLOR.GAIN:Constant.COLOR.LOSS):null;

    this.display.text2.info = soldPricePercentDiff != null? "%" + soldPricePercentDiff: "none";
    this.display.text3.info = lastOrder != null? parseInt(lastOrder.cumulative_quantity,10) + "": "none";
    this.display.text4.info = lastOrder != null?
      "$"+this.decimalPipe.transform(lastOrder.average_price, '1.2'): "none";
  }

  /**
   * Left Button is a Unwatch Button
   */
  leftButton(){
    this.rb.removeStockFromWatchList(this.stock.instrument)
  }

  /**
   * Right Button is a Buy Button
   */
  rightButton(){
    if(this.order.type === "Market"){
      this.rb.MarketBuy(this.stock, this.order.price, this.order.quantity);
    }else if (this.order.type === "Limit"){
      this.rb.ImmediateLimitBuy(this.stock, this.order.price, this.order.quantity);
    }else if (this.order.type === "Stop Loss"){
      this.rb.StopLossBuy(this.stock, this.order.quantity, this.order.price);
    }
  }



  /**
   * Need to round the price to 2 decimal points or Robinhood will not take the order
   * for stock with price > $1
   */
  updatePrice(){
    this.order.price = Number(this.stock.instrument.quote.last_trade_price).toFixed(2);
  }

  showStockPanel(){
    // TODO get the correct string / element to pass in
    this.showPanel.emit(this.stock.display.symbol);
  }

}
