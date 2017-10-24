/**
 * Created by roy_f on 9/4/2017.
 */


import {Injectable} from "@angular/core";
import {StockModule} from "../model/Stock.model";
import {OrderModule} from "../model/Order.model";
import {AccountModule} from "../model/Account.model";
import {Constant} from "../model/constant";

import Stock = StockModule.Stock;
import Order = OrderModule.Order;
import Quote = StockModule.Quote;
import {Headers, Http, URLSearchParams} from "@angular/http";
import {Historical, GraphData} from "../model/Historical.model";
import OrderTimeInForce = Constant.OrderTimeInForce;
import OrderType = Constant.OrderType;
import OrderTrigger = Constant.OrderTrigger;
import Sides = Constant.Sides;
import STOCK = Constant.STOCK;
import INSTRUMENT = Constant.INSTRUMENT;
import Account = AccountModule.Account;
import Portfolio = AccountModule.Portfolio;
@Injectable()

export class RobinhoodService{
  public static WINDOW_STORAGE={
    auth: "auth"
  };

  public _apiUrl = 'https://api.robinhood.com/';
  public _endpoints = {
    login:  'api-token-auth/',
    logout: 'api-token-logout/',
    investment_profile: 'user/investment_profile/',
    accounts: 'accounts/',
    ach_iav_auth: 'ach/iav/auth/',
    ach_relationships:  'ach/relationships/',
    ach_transfers:'ach/transfers/',
    ach_deposit_schedules: "ach/deposit_schedules/",
    applications: 'applications/',
    dividends:  'dividends/',
    documents: 'documents/',
    instruments:  'instruments/',
    margin_upgrade:  'margin/upgrades/',
    markets:  'markets/',
    notifications:  'notifications/',
    notifications_devices: "notifications/devices/",
    orders: 'orders/',
    cancel_order: 'orders/',      // API expects https://api.robinhood.com/orders/{{orderId}}/cancel/
    password_reset: 'password_reset/request/',
    quotes: 'quotes/',
    document_requests:  'upload/document_requests/',
    user: 'user/',
    historicals: 'quotes/historicals/',

    user_additional_info: "user/additional_info/",
    user_basic_info: "user/basic_info/",
    user_employment: "user/employment/",
    user_investment_profile: "user/investment_profile/",

    watchlists: 'watchlists/Default',
    positions: 'positions/',
    fundamentals: 'fundamentals/',
    sp500_up: 'midlands/movers/sp500/?direction=up',
    sp500_down: 'midlands/movers/sp500/?direction=down',
    news: 'midlands/news/'
  }

  _private = {
    session : {},
    headers : {
      'Accept': '*/*',
      'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
      'Content-Type': 'application/json',
      'X-Robinhood-API-Version': '1.152.0',
      'Authorization' : null
    },
  }


  account = {
    positions: {},
    watchList: {},
    information: new Account(null),
    recentOrders: [],
}

  parent = this;
  serviceInterval = null;
  private instrumentCache = {};
  private queryCache = {
    stack: [],
    cache: {},
    MAX_SIZE: 20,
    getCache: function(searchQuery){
      return(this.cache[searchQuery])
    },
    pushCache: function(searchQuery, result){
      if(this.cache[searchQuery]== null){
        this.cache[searchQuery] = result;
        this.stack.push(searchQuery);
        this.trim();
      }
    },
    trim: function(){
      if(this.stack.length > this.MAX_SIZE){
        const out = this.stack.splice(0,1);
        delete this.cache[out];
      }
    }
  };

  constructor(public http: Http){
    const auth = window.localStorage['ROBINHOOD-AUTH'];
    if(auth != null ) {
      this.addTokenToHeader(auth);
    }
  }

  isAlreadyLoggedOn(){
    if(this._private.headers.Authorization != null){
      return(true);
    }else{
      return(false);
    }
  }


  startService(){
    return(new Promise((resolve,reject)=>{
          this.subscribeService(5000);
          resolve();
    }))
  }

  stopService(){
    const id = this.serviceInterval;
    clearInterval(id);
    this.serviceInterval = null;
  }

  subscribeService(delay){
    const that = this;
    let start = true;
    if(this.serviceInterval == null){
      // Only runs new service if there isn't an existing service thread running
      this.serviceInterval = setInterval(function(){
        if(start){
          start = false;
          const serviceList = [that.setAccountInformation(),that.getPositions(), that.getWatchList(), that.getOrders()];
          Promise.all(serviceList.map(p => p.catch(e => e))).then(function(res){
            setTimeout(function(){
              start = true;
            }, delay);
          });
        }
      }, 1000);
    }
  }

  unsubscribeService(){
    clearInterval(this.serviceInterval);
  }

  setHeaders(){
    const header = new Headers();
    for (const h of Object.keys(this._private.headers)) {
      header.set(h, this._private.headers[h]);
    }
    return (header);
  }

  addTokenToHeader(token){
    this._private.headers.Authorization = "Token " + token;
  }

  getOrders(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.orders,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const orders = [];
        res.json().results.forEach(item=>{
          orders.push(new Order(item));
        });

        const promises = [];
        orders.forEach(o =>{
          const p = this.getInstrument(o);
          promises.push(p);
        })
        Promise.all(promises).then(()=>{
          this.account.recentOrders = orders;
          resolve(res);
        })
      }, error=>{
        reject(error);
      })
    }))
  }

  getPositions(){
    //console.log("get positions");
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.positions
        +"?nonzero=true",{
        headers: this.setHeaders()
      }).subscribe(res=>{

        // get all instruments for each stock
        const positions = [];
        res.json().results.forEach(r=>{
          positions.push(new Stock(r));
        });
        const promises = [];
        positions.forEach(position=>{
          const p = this.getInstrument(position);
          promises.push(p);
        });

        // updating new stock after getting the promises
        Promise.all(promises).then(()=>{

          this.updateStock(this.account.positions, positions, true);


          resolve(res);
        });
      }, error=>{
        reject(error);
      })
    }))
  }

  resolveField(object, fieldName){
    return(new Promise((resolve,reject)=>{
      this.http.get(object[fieldName]).subscribe(res=>{
        object[fieldName] = res.json();
        resolve(res)
      },error=>{
        reject(error);
      })
    }))
  }

  getInstrument(object){
    return(new Promise((resolve,reject)=>{
      if(this.instrumentCache[object.instrument]){
        object.instrument = JSON.parse(JSON.stringify(this.instrumentCache[object.instrument]));
        this.getQuote(object.instrument).then(res2=>{
          resolve(res2);
        },error=>{
          reject(error);
        })
      }else{
        this.http.get(object.instrument).subscribe(res=>{
          this.instrumentCache[object.instrument] = JSON.parse(JSON.stringify(res.json()));
          object.instrument = res.json();
          this.getQuote(object.instrument).then(res2=>{
            resolve(res2);
          },error=>{
            reject(error);
          })
        }, error=>{
          reject(error);
        })
      }
    }))
  }

  getQuote(instrument){
    return(new Promise((resolve,reject)=>{
      this.http.get(instrument.quote).subscribe(res=>{
        const q:Quote = res.json();
        instrument.quote = q;
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }

  getWatchList(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.watchlists,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const watchList = [];
        res.json().results.forEach(data=>{
          watchList.push(new StockModule.Stock(data));
        });
        const promises =[]
        watchList.forEach(watchItem =>{
          promises.push(this.getInstrument(watchItem));
        })
        Promise.all(promises).then(()=>{
          this.updateStock(this.account.watchList, watchList, false);
          resolve(res);
        });
      }, error=>{
        reject(error);
      })
    }))
  }

  setAccountInformation(){
    return(new Promise((resolve,reject)=>{
      this.http.get(this._apiUrl + this._endpoints.accounts,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const account: Account = new Account(res.json().results[0]);
        this.getPortfolioInformation(account).then(res2=>{
          this.account.information = account;
          resolve(res2)
        }, error=>{
          reject(error);
        });
      }, error=>{
        reject(error);
      })
    }))
  }
  getPortfolioInformation(account:Account){
    return(new Promise((resolve,reject)=>{
      this.http.get(account.portfolio,{
        headers: this.setHeaders()
      }).subscribe(res=>{
        const port:Portfolio = res.json();
        account.portfolio = port;
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }

  login(username: string, password: string){
    return(new Promise((resolve,reject)=>{
      this.http.post(this._apiUrl + this._endpoints.login, {
        username: username,
        password: password
      }).subscribe(res=>{
        this.addTokenToHeader(res.json().token);
        window.localStorage['ROBINHOOD-AUTH'] = res.json().token;
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }
  logout(){
    return(new Promise((resolve,reject)=>{
      this.stopService();
      this.http.post(this._apiUrl + this._endpoints.logout, {
      },{
        headers: this.setHeaders()
      }).subscribe(res=>{
        window.localStorage.removeItem('ROBINHOOD-AUTH');
        this._private.headers.Authorization = null;
        resolve(res);
      }, (error)=>{
        window.localStorage.removeItem('ROBINHOOD-AUTH');
        this._private.headers.Authorization = null;
        resolve(error);
      });
    }))
  }

  cancelOrder(order:Order){
    return(new Promise((resolve,reject)=>{
      this.http.get(order.cancel).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error);
      })
    }))
  }

  /**
   * All Buy functions are untested, test with caution.
   * @param {StockModule.Stock} stock
   * @param quantity
   * @constructor
   */
  MarketBuy(stock:Stock,price, quantity){
    return(new Promise((resolve,reject)=>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.MARKET,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.IMMEDIATE,
        quantity: quantity,
        side: Sides.BUY,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false,
        price: price
      }, {
        headers: this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error);
      })
    }))
  }

  /**
   * UNTESTED!!!!!
   * May not support this since there isn't enough space yet on the interface......
   * @param {StockModule.Stock} stock
   * @param price
   * @param quantity
   * @param stop_price
   * @constructor
   */
  StopLimitBuy(stock:StockModule.Stock, price, quantity, stop_price){
    return(new Promise(((resolve, reject) =>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.LIMIT,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.STOP,
        price: price,
        stop_price : stop_price,
        quantity: quantity,
        side: Sides.BUY,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      },{
        headers:this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      },error =>{
        reject(error)
      })
    })))
  }

  /**
   * DOES NOT EXECUTE IN EXTENDED HOURS EVER
   * @param {StockModule.Stock} stock
   * @param quantity
   * @param stop_price
   * @returns {Promise<any>}
   * @constructor
   */
  StopLossBuy(stock:StockModule.Stock, quantity, stop_price){
    return(new Promise(((resolve, reject) =>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.MARKET,
        price: stop_price,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.STOP,
        stop_price : stop_price,
        quantity: quantity,
        side: Sides.BUY,
        extended_hours: false,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }, {
        headers:this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      },error =>{
        reject(error)
      })
    })))
  }

  ImmediateLimitBuy(stock:Stock, price, quantity){
    return(new Promise((resolve,reject)=>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.LIMIT,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.IMMEDIATE,
        price: price,
        quantity: quantity,
        side: Sides.BUY,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }, {
        headers: this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      }, error=>{
        reject(error);
      })
    }))
  }

  StopLimitSell(stock:StockModule.Stock, price, quantity, stop_price){
    return(new Promise(((resolve, reject) => {
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.LIMIT,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.STOP,
        price: price,
        stop_price : stop_price,
        quantity: quantity,
        side: Sides.SELL,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }, {
        headers: this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      }, error=>{
        reject(error);
      })
    })))

  }

  /**
   * In Market sells, the sell will initiate within 5% of the marketPrice entered.
   * @param {StockModule.Stock} stock
   * @param marketPrice
   * @param quantity
   * @returns {Promise<any>}
   * @constructor
   */
  MarketSell(stock:Stock, marketPrice, quantity){
    return(new Promise((resolve,reject)=>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.MARKET,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.IMMEDIATE,
        quantity: quantity,
        price: marketPrice,
        side: Sides.SELL,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error);
      })
    }))
  }

  ImmediateLimitSell(stock:Stock, price, quantity){
    return new Promise(((resolve, reject) => {
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.LIMIT,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.IMMEDIATE,
        price: price,
        quantity: quantity,
        side: Sides.SELL,
        extended_hours: true,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }).subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error);
      })
    }))
  }

  /**
   * DOES NOT EXECUTE IN EXTENDED HOURS EVER
   * @param {StockModule.Stock} stock
   * @param quantity
   * @param stop_price
   * @returns {Promise<any>}
   * @constructor
   */
  StopLossSell(stock:StockModule.Stock, quantity, stop_price){
    return(new Promise(((resolve, reject) =>{
      this.http.post(this._apiUrl + this._endpoints.orders, {
        account: this.account.information.url,
        instrument: stock.instrument.url,
        symbol: stock.instrument.symbol,
        type: OrderType.MARKET,
        price: stop_price,
        time_in_force: OrderTimeInForce.GOOD_TILL_CANCELED,
        trigger: OrderTrigger.STOP,
        stop_price : stop_price,
        quantity: quantity,
        side: Sides.SELL,
        extended_hours: false,
        override_day_trade_checks: false,
        override_dtbp_checks: false
      }, {
        headers:this.setHeaders()
      }).subscribe(res=>{
        resolve(res);
      },error =>{
        reject(error)
      })
    })))
  }

  /**
   * function to get all the historical data of a stock
   * should be used by the stock tile to update the graph
   * @param symbol [required]
   * @param interval [required] : week|day|10minute|5minute|null(all)
   * @param span : day|week|year|5year|all
   * @param bound : extended|regular|trading
   * @returns {Promise}
   */
  getHistoricalsData(symbol, options):Promise<GraphData>{

    return(new Promise((resolve,reject)=>{
      const params:URLSearchParams = new URLSearchParams();
      if(options.interval) params.set(Historical.QUERY.INTERVAL, options.interval);
      if(options.span) params.set(Historical.QUERY.SPAN, options.span);
      if(options.bound) params.set(Historical.QUERY.BOUND, options.bound);

      this.http.get(this._apiUrl + this._endpoints.historicals + symbol + "/", {
       search: params
      }).subscribe(res=>{
        res = res.json();
        const data = new GraphData(res);
        resolve(data);
      }, error=>{
        reject(error);
      })
    }))
  }

  /**
   * Takes a query string and searches for the stock, the query string does not have to be just the symbol.
   * The query string can also contain the name of the
   * stock and it still will be found.
   * @param {string} query
   * @returns {Promise<any>}
   *
   */
  queryStock(query:string): Promise<any>{
    return(new Promise((resolve,reject)=>{
      const cacheValue = this.queryCache.getCache(query);
      if(cacheValue == null){
        this.http.get(this._apiUrl + this._endpoints.instruments+ "?query=" + query).subscribe(res=>{
          this.queryCache.pushCache(query, JSON.parse(JSON.stringify(res.json())));
          resolve(res.json());
        }, error=>{
          reject(error);
        })
      }else{
        resolve(cacheValue);
      }


    }))
  }

  /**
   * function to update the stock list after getting updated stock info
   * reassign new stock to the existed list
   * delete old stock if it is not in the new list
   * @param dict (the existed list)
   * @param newList
   */
  updateStock(dict, newList, isPosition){
    var map = {};
    const keys = Object.keys(dict);

    newList.forEach((stock:Stock) => {
      stock.initDisplayData(isPosition);

      let id = stock[STOCK.INSTRUMENT][INSTRUMENT.SYMBOL];
      map[id] = stock;
      dict[id] = stock;
    });

    keys.forEach(k => {
      if(!map[k]){
        delete dict[k];
      }
    });

  }




}
