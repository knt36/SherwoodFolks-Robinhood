/**
 * Created by anhle on 10/19/17.
 */
export module Constant{


    export class QUERY_ACTION {
        public static INPOSITION = 'none';
        public static WATCHING = 'unwatch';
        public static UNWATCH = 'watch';
    }

    export class STOCK {
        public static INSTRUMENT = 'instrument';

    }

    export class COLOR {
        public static GAIN = 'green';
        public static LOSS = 'red';
    }

    export class INSTRUMENT {
        public static SYMBOL = 'symbol';
        public static NAME = 'simple_name';
    }

    // Final Constants
    export class OrderType{
        public static MARKET = "market";
        public static LIMIT = "limit";
        public static STOP_LOSS = "stop loss";
        public static STOP_LIMIT = "stop limit";
    }

    export class OrderTimeInForce{
        public static GOOD_TILL_CANCELED = "gtc";
        public static GOOD_FOR_DAY = "gfd";
    }

    export class OrderTrigger{
        public static IMMEDIATE="immediate";
        public static STOP="stop";
    }

    export class State{
        public static QUEUED = "queued";
        public static UNCONFIRMED = "unconfirmed";
        public static CONFIRMED = "confirmed";
        public static ARTIALLY_FILLED = "partially_filled";
        public static FILLED = "filled";
        public static REJECTED = "rejected";
        public static CANCELED = "canceled";
        public static FAILED = "failed";
    }

    export class Sides{
        public static BUY =  "buy";
        public static SELL = "sell";
    };

    export class Graph{

        public static INTERVAL = {
            TEN_M: '10minute',
            FIVE_M: '5minute'
        };

        public static SPAN = {
            DAY: 'day'
        };

        public static BOUND = {
            REGULAR: 'regular',
            EXTENDED: 'extended'
        };

    };

    export class Messages {
      public static ERRORS = {
        MARKET_BUY: "Market Buy Failed",
        LIMIT_BUY: "Limit Buy Failed",
        STOP_LOSS_BUY: "Stop Loss Buy Failed",
        STOP_LIMIT_BUY: "Stop Limit Buy Failed",

        MARKET_SELL: "Market Sell Failed",
        LIMIT_SELL: "Limit Sell Failed",
        STOP_LOSS_SELL: "Stop Loss Sell Failed",
        STOP_LIMIT_SELL: "Stop Limit Sell Failed",
      }

      public static SUCCESS = {
        MARKET_BUY: {
          Title: "Market Buy Placed",
          Detail: function (symbol, quantity, price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each.");
          }
        },
        LIMIT_BUY: {
          Title: "Limit Buy Placed",
          Detail: function (symbol, quantity, price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each or better.");
          }
        },
        STOP_LOSS_BUY: {
          Title: "Stop Loss Buy Placed",
          Detail: function (symbol, quantity, stop_price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " when stop triggered at $" +
              stop_price);
          }
        },
        STOP_LIMIT_BUY: {
          Title: "Stop Limit Buy Placed",
          Detail: function (symbol, quantity, price, stop_limit) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each when stop triggered at " +
              stop_limit);
          }
        },

        MARKET_SELL: {
          Title: "Market Sell Placed",
          Detail: function (symbol, quantity, price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each.");
          }
        },
        LIMIT_SELL: {
          Title: "Limit Sell Placed",
          Detail: function (symbol, quantity, price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each or better.");
          }
        },
        STOP_LOSS_SELL: {
          Title: "Stop Loss Sell Placed",
          Detail: function (symbol, quantity, stop_price) {
            return ("Order placed for " + quantity + " shares of " + symbol + " when stop triggered at $" +
              stop_price);
          }
        },
        STOP_LIMIT_SELL: {
          Title: "Stop Limit Sell Placed",
          Detail: function (symbol, quantity , price, stop_limit) {
            return ("Order placed for " + quantity + " shares of " + symbol + " for $" + price + " each when stop triggered at $" +
              stop_limit);
          }
        }
      }
    }
}
