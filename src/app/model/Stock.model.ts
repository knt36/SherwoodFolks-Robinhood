import {GraphData} from "./Historical.model";
export module StockModule {

  export class Stock {
    shares_held_for_stock_grants: string;
    account: string;
    intraday_quantity: string;
    intraday_average_buy_price: string;
    url: string;
    created_at: Date;
    updated_at: Date;
    shares_held_for_buys: string;
    average_buy_price: string;
    instrument: Instrument;
    shares_held_for_sells: string;
    quantity: string;
    display: Display;


    public constructor(data){
      this.shares_held_for_buys = data.shares_held_for_buys;
      this.account= data.account;
      this.intraday_quantity= data.intraday_quantity;
      this.intraday_average_buy_price = data.intraday_average_buy_price;
      this.url = data.url;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.shares_held_for_buys = data.shares_held_for_buys;
      this.average_buy_price = data.average_buy_price;
      this.instrument = data.instrument;
      this.shares_held_for_sells =data.shares_held_for_sells;
      this.quantity = data.quantity;
      this.display = null;
    }

    public initDisplayData(isPosition){
        this.display = new Display();
        this.display.symbol = this.instrument.symbol;
        this.display.quantity = Number(this.quantity);
        this.display.avg_cost = Number(this.average_buy_price);
        this.display.price = Number(this.instrument.quote.last_trade_price);

        const currentValue = this.display.price * this.display.quantity;
        const prevClose = Number(this.instrument.quote.adjusted_previous_close);
        const percentChange = (currentValue - prevClose) / prevClose;

        if(isPosition){
          const totalCost = this.display.avg_cost * this.display.quantity;
          const profit = currentValue - totalCost;
          const percentReturn = profit / totalCost;

          this.display.total_profit = profit;
          this.display.percent_return = percentReturn.toFixed(2).toString();
        }

        this.display.percent_change = percentChange.toFixed(2).toString();
        this.display.gain = percentChange > 0 ? 'up' : 'down';
    }

  }



  export class Display {
    symbol : string;
    price : number;
    gain : string;
    percent_change: string;
    total_profit: number;
    percent_return: string;
    quantity: number;
    avg_cost: number;

    public constructor(){
      this.avg_cost = null;
      this.quantity = null;
      this.gain = null;
      this.total_profit = null;
      this.percent_return = null;
    }


  }

  export class Instrument {
    min_tick_size: string;
    type: string;
    splits: string;
    margin_initial_ratio: string;
    url: string;
    quote: Quote;
    tradability: string;
    bloomberg_unique: string;
    list_date: string;
    name: string;
    symbol: string;
    fundamentals: string;
    state: string;
    country: string;
    day_trade_ratio: string;
    tradeable: boolean;
    maintenance_ratio: string;
    id: string;
    market: string;
    simple_name: string;

    public constructor(data){
      this.min_tick_size = data.min_tick_size;
      this.type = data.type;
      this.splits = data.splits;
      this.margin_initial_ratio = data.margin_initial_ratio;
      this.url = data.url;
      this.quote = data.quote;
      this.tradability = data.tradability;
      this.bloomberg_unique = data.bloomberg_unique;
      this.list_date = data.list_date;
      this.name = data.name;
      this.symbol = data.symbol;
      this.fundamentals = data.fundamentals;
      this.state = data.state;
      this.country = data.country;
      this.day_trade_ratio = data.day_trade_ratio;
      this.tradeable = data.tradable;
      this.maintenance_ratio = data.maintenance_ratio;
      this.id = data.id;
      this.market = data.market;
      this.simple_name = data.simple_name;
    }
  }

    export class Quote {
      ask_price: string;
      ask_size: number;
      bid_price: string;
      bid_size: number;
      last_trade_price: string;
      last_extended_hours_trade_price: string;
      previous_close: string;
      adjusted_previous_close: string;
      previous_close_date: string;
      symbol: string;
      trading_halted: boolean;
      has_traded: boolean;
      last_trade_price_source: string;
      updated_at: Date;
      instrument: Instrument;
    }

}
