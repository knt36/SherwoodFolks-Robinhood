import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
/**
 * Created by roy_f on 7/31/2017.
 */


@Injectable()
export class RobinhoodDataService {
  public accessToken = null;
  public watchList: Stock[] = [];
  public positionList: Stock[] = [];
  public account: Account = null;

  constructor(public http: HttpClient) {
    this.sampleFunction();
  }

  public sampleFunction(){
    this.login("", "").then(res=>{
      this.getAccounts().then(result=>{
        this.getWatchList().then(watchlist=>{
          this.getPositionList().then(positions=>{
            this.getWatchItemHistoricsAll("5minute", "regular", "day").then(updatedPositionWatch=>{
              console.log(updatedPositionWatch);
            });
          });
        });
      })
    });
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };
    return (new HttpHeaders(headersConfig));
  }

  private setAuthHeaders(): HttpHeaders {
    if(this.accessToken == null){
      throw ERROR.NO_AUTH;
    }else {
      const headersConfig = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Token ' + this.accessToken
      };
      return (new HttpHeaders(headersConfig));
    }
  }

  // Robinhood Api
  public login(username: string, password: string): Promise <any> {
    const promise: Promise<Boolean> = new Promise((resolve, reject) => {
      const body = new URLSearchParams();
      body.set("username", username);
      body.set("password", password);
      this.http.post<LoginResponse.RootObject>("https://api.robinhood.com/api-token-auth/", body.toString(),
        { headers: this.setHeaders()}).subscribe(res => {
          this.accessToken = res.token;
          resolve(this.accessToken);
      },
        res => {
          reject(null);
        }
      );
    });
    return(promise);
  }
  public getPositionList():Promise<any>{
    return(new Promise((resolve,reject)=>{
      this.http.get<PositionResponse.RootObject>("https://api.robinhood.com/positions/",
        {headers:this.setAuthHeaders()}).subscribe(response=>{
          const promises = [];
          response.results.forEach(position =>{
            if(parseInt(position.quantity,10)>0){
              const promise = this.getStockDetail(position.instrument);
              promises.push(promise);
              promise.then(detail=>{
                this.positionList.push(new Stock(detail,position));
              })
            }else{
              // we already sold that position.
            }
          });
          Promise.all(promises).then(res=>{
            resolve(this.positionList);
          })
      });
    }));
  }
  public getWatchList():Promise<any>{
    return(new Promise((resolve,reject)=>{
      this.http.get<WatchListResponse.RootObject>("https://api.robinhood.com/watchlists/Default/",
        { headers: this.setAuthHeaders()}).subscribe(res=>{
          const promises = [];
          res.results.forEach(result=>{
            promises.push(this.getStockDetail(result.instrument).then(stockDetails =>{
              const temp: WatchListItemDetailResponse.RootObject = stockDetails;
              this.watchList.push(new Stock(temp, null));
            }));
          });
          Promise.all(promises).then(outcome=>{
            // only resolve when all the promises go through
            resolve(this.watchList);
          });
      })
    }))
  }
  public getStockDetail(instrumentURL:string): Promise<any> {
    // urlstring provided from the getwatchlist procedure
    return(new Promise((resolve,reject)=>{
      this.http.get<WatchListItemDetailResponse.RootObject>(instrumentURL,{headers:this.setAuthHeaders()}).subscribe(res=>{
        resolve(res);
      });
    }));
  }
  public getStockHistorics(symbol,interval, bound, span): Promise<any> {
    return(new Promise((resolve,reject)=>{
      const httpParams = new HttpParams();
      httpParams.set("interval", interval);
      httpParams.set("bound", bound);
      httpParams.set("span", span);
      this.http.get<HistoricsResponse.RootObject>("https://api.robinhood.com/quotes/historicals/" + symbol + "/?" +
      "interval=" + interval + "&bound=" + bound + "&span=" + span
      ).subscribe(res=>{
          resolve(res);
      });
    }));
  }
  public getWatchItemHistoricsAll(interval, bound, span): Promise<any>{
    return(new Promise((resolve,reject)=>{
      const allPromises = [];
      this.watchList.forEach(watchItem=>{
        const promise = this.getStockHistorics(watchItem.watchListItemDetail.symbol,interval,bound,span).then(historics=>{
          watchItem.historics = historics;
        });
        allPromises.push(promise);
      });

      this.positionList.forEach(positionItem=>{
        const promise = this.getStockHistorics(
          positionItem.watchListItemDetail.symbol,interval,bound,span).then(historics=>{
          positionItem.historics = historics;
        });
        allPromises.push(promise);
      });
      Promise.all(allPromises).then(completed=>{
        resolve({watchlist:this.watchList,positions:this.positionList});
      });
    }))
  }
  public getAccounts(): Promise <any> {
    return(
      new Promise((resolve, reject) => {
        this.http.get<AccountResponse.RootObject>("https://api.robinhood.com/accounts/",
          {headers: this.setAuthHeaders()}).subscribe(res => {
          this.account = new Account(res.results[0]);
          resolve(this.account);
        }, (res) => {
          reject(null);
        })
      })
    );
  }
}

export class ERROR{
  public static NO_AUTH = "NO_AUTH"
}

declare module LoginResponse {

  export interface RootObject {
    token: string;
  }

}

declare module HistoricsResponse {

  export interface Historical {
    begins_at: Date;
    open_price: string;
    close_price: string;
    high_price: string;
    low_price: string;
    volume: number;
    session: string;
    interpolated: boolean;
  }

  export interface RootObject {
    quote: string;
    symbol: string;
    interval: string;
    span: string;
    bounds: string;
    previous_close_price: string;
    open_price: string;
    open_time: Date;
    instrument: string;
    historicals: Historical[];
  }

}

declare module WatchListResponse {

  export interface Result {
    watchlist: string;
    instrument: string;
    created_at: Date;
    url: string;
  }

  export interface RootObject {
    previous?: any;
    results: Result[];
    next?: any;
  }

}

declare module WatchListItemDetailResponse {

  export interface RootObject {
    min_tick_size?: any;
    type: string;
    splits: string;
    margin_initial_ratio: string;
    url: string;
    quote: string;
    symbol: string;
    bloomberg_unique: string;
    list_date: string;
    name: string;
    fundamentals: string;
    state: string;
    country: string;
    day_trade_ratio: string;
    tradeable: boolean;
    maintenance_ratio: string;
    id: string;
    market: string;
    simple_name: string;
  }

}

declare module AccountResponse {

  export interface MarginBalances {
    day_trade_buying_power: string;
    start_of_day_overnight_buying_power: string;
    overnight_buying_power_held_for_orders: string;
    cash_held_for_orders: string;
    created_at: Date;
    unsettled_debit: string;
    start_of_day_dtbp: string;
    day_trade_buying_power_held_for_orders: string;
    overnight_buying_power: string;
    marked_pattern_day_trader_date: string;
    cash: string;
    unallocated_margin_cash: string;
    updated_at: Date;
    cash_available_for_withdrawal: string;
    margin_limit: string;
    outstanding_interest: string;
    uncleared_deposits: string;
    unsettled_funds: string;
    day_trade_ratio: string;
    overnight_ratio: string;
  }

  export interface InstantEligibility {
    updated_at?: any;
    reason: string;
    reinstatement_date?: any;
    reversal?: any;
    state: string;
  }

  export interface Result {
    deactivated: boolean;
    updated_at: Date;
    margin_balances: MarginBalances;
    portfolio: string;
    cash_balances?: any;
    can_downgrade_to_cash: string;
    withdrawal_halted: boolean;
    cash_available_for_withdrawal: string;
    type: string;
    sma: string;
    sweep_enabled: boolean;
    deposit_halted: boolean;
    buying_power: string;
    user: string;
    max_ach_early_access_amount: string;
    instant_eligibility: InstantEligibility;
    cash_held_for_orders: string;
    only_position_closing_trades: boolean;
    url: string;
    positions: string;
    created_at: Date;
    cash: string;
    sma_held_for_orders: string;
    unsettled_debit: string;
    account_number: string;
    uncleared_deposits: string;
    unsettled_funds: string;
  }

  export interface RootObject {
    previous?: any;
    results: Result[];
    next?: any;
  }

}

declare module PositionResponse {

  export interface PositionDetail {
    shares_held_for_stock_grants: string;
    account: string;
    intraday_quantity: string;
    intraday_average_buy_price: string;
    url: string;
    created_at: Date;
    updated_at: Date;
    shares_held_for_buys: string;
    average_buy_price: string;
    instrument: string;
    shares_held_for_sells: string;
    quantity: string;
  }

  export interface RootObject {
    previous?: any;
    results: PositionDetail[];
    next?: any;
  }

}




export class Stock{
  public historics: HistoricsResponse.RootObject = null;
  public watchListItemDetail: WatchListItemDetailResponse.RootObject = null;
  public positionListItemDetail:PositionResponse.PositionDetail = null;

  constructor(watchListItemDetail:WatchListItemDetailResponse.RootObject,
              positionListItemDetail: PositionResponse.PositionDetail){
    this.watchListItemDetail = watchListItemDetail;
    this.positionListItemDetail = positionListItemDetail;
  }
}

export class Account{
  public accountDetails: AccountResponse.Result = null;
  constructor(accountDetails:AccountResponse.Result){
    this.accountDetails = accountDetails;
  }
}
