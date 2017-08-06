import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
/**
 * Created by roy_f on 7/31/2017.
 */


@Injectable()
export class RobinhoodDataService {
  public token = "";

  constructor(public http: HttpClient) {

  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };
    return (new HttpHeaders(headersConfig));
  }

  private setAuthHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Token ' + this.token
    };
    return (new HttpHeaders(headersConfig));
  }

  // Robinhood Api
  public login(username: string, password: string): Promise <any> {
    const promise: Promise<Boolean> = new Promise((resolve, reject) => {
      let body = new URLSearchParams();
      body.set("username", username);
      body.set("password", password);
      this.http.post<LoginResponse>("https://api.robinhood.com/api-token-auth/", body.toString(),
        { headers: this.setHeaders()}).subscribe(res => {
        this.token = res.token + "";
        resolve();
      },
        res => {
          reject();
        }
      );
    });
    return(promise);
  }

  public getAccounts(): Promise <any> {
    return(
      new Promise((resolve, reject) => {
        this.http.get<GetAccountResponse>("https://api.robinhood.com/accounts/", {headers: this.setAuthHeaders()}).subscribe(res => {
          resolve(res.results);
        }, (res) => {
          reject([]);
        })
      })
    );
  }

  // public cmdAccounts(link: string): Promise <any> {
  // }
}

export interface GetAccountResponse {
  results: Result[];
}

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

interface LoginResponse {
  token: string[];
}
