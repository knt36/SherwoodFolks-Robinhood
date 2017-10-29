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
        public static PARTIALLY_FILLED = "partially_filled";
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
}
