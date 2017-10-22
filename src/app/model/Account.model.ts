import {hasOwnProperty} from "tslint/lib/utils";
import {Constant} from "./constant";

export module AccountModule {

  export class MarginBalances {
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
    gold_equity_requirement: string;
    day_trade_ratio: string;
    overnight_ratio: string;
  }

  export class InstantEligibility {
    updated_at?: any;
    reason: string;
    reinstatement_date?: any;
    reversal?: any;
    state: string;
  }

  export class Account {
    deactivated: boolean;
    updated_at: Date;
    margin_balances: MarginBalances;
    portfolio: any;
    cash_balances: any;
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

    constructor(data){
      for(const d in data){
        if(data.hasOwnProperty(d)){
          this[d] = data[d];
        }
      }
    }

    getMonetaryProfit(){
      if(this.portfolio  != null){
        return(parseFloat(this.portfolio.equity) - parseFloat(this.portfolio.equity_previous_close));
      }else{
        return(null);
      }
    }

    isGain(){
      if(this.getMonetaryProfit() >=0){
        return Constant.COLOR.GAIN;
      }else{
        return Constant.COLOR.LOSS;
      }
    }
  }

  export interface Portfolio {
    unwithdrawable_grants: string;
    account: string;
    excess_maintenance_with_uncleared_deposits: string;
    url: string;
    excess_maintenance: string;
    market_value: string;
    withdrawable_amount: string;
    last_core_market_value: string;
    unwithdrawable_deposits: string;
    extended_hours_equity: string;
    excess_margin: string;
    excess_margin_with_uncleared_deposits: string;
    equity: string;
    last_core_equity: string;
    adjusted_equity_previous_close: string;
    equity_previous_close: string;
    start_date: string;
    extended_hours_market_value: string;
  }


}

