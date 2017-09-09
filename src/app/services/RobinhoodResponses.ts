/**
 * Created by roy_f on 9/7/2017.
 */

export class ResponseLogin{
  public token: string = null;
}

export module ResponsePosition {
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
