/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {StockModule} from "../../model/Stock.model";
import Stock = StockModule.Stock;
import {RobinhoodService} from "../../services/RobinhoodService";

@Component({
    selector: 'stock-tile',
    templateUrl : './stock-tile.component.html',
    styleUrls: ['./stock-tile.component.scss']
})


export class StockTileComponent implements OnInit{

    @Input('stock') stock: Stock;

    public order;
    orderTypes = [
        'Market', 'Limit',
      // 'Stop Limit',
      'Stop Loss'
    ];


    constructor(public rb:RobinhoodService){



    }

    ngOnInit() {


      this.order = {
        quantity: 0,
        price: this.stock.instrument.quote.last_trade_price,
        type: this.orderTypes[0]
      };
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
