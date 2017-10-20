import {StockModule} from "./Stock.model";

export module OrderModule {
  import Instrument = StockModule.Instrument;

  export class Execution {
    timestamp: Date;
    price: string;
    settlement_date: string;
    id: string;
    quantity: string;

    public constructor(data) {
      this.timestamp = data.timestamp;
      this.price = data.price;
      this.settlement_date = data.settlement_date;
      this.id = data.id;
      this.quantity = data.quantity;
    }
  }

  export class Order {
    updated_at: Date;
    ref_id?: any;
    time_in_force: string;
    fees: string;
    cancel?: any;
    id: string;
    cumulative_quantity: string;
    stop_price?: any;
    reject_reason?: any;
    instrument: Instrument;
    state: string;
    trigger: string;
    override_dtbp_checks: boolean;
    type: string;
    last_transaction_at: Date;
    price: string;
    executions: Execution[];
    extended_hours: boolean;
    account: any;
    url: string;
    created_at: Date;
    side: string;
    override_day_trade_checks: boolean;
    position: any;
    average_price: string;
    quantity: string;

    public constructor(data) {
      this.updated_at = data.updated_at;
      this.ref_id = data.ref_id;
      this.time_in_force = data.time_in_force;
      this.fees = data.fees;
      this.cancel = data.cancel;
      this.id = data.id;
      this.cumulative_quantity = data.cumulative_quantity;
      this.stop_price = data.stop_price;
      this.reject_reason = data.reject_reason;
      this.instrument = data.instrument;
      this.state = data.state;
      this.trigger = data.trigger;
      this.override_dtbp_checks = data.override_dtbp_checks;
      this.type = data.type;
      this.last_transaction_at = data.last_transaction_at;
      this.price = data.price;
      this.executions = data.executions;
      this.extended_hours = data.extended_hours;
      this.account = data.account;
      this.url = data.url;
      this.created_at = data.created_at
      this.side = data.side;
      this.override_day_trade_checks = data.override_day_trade_checks;
      this.position = data.position;
      this.average_price = data.average_price;
      this.quantity = data.quantity;
    }
  }


}


