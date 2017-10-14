/**
 * Created by roy_f on 9/4/2017.
 */
export class Order{
  public static STATES = {
    QUEUED: "queued",
    UNCONFIRMED: "unconfirmed",
    CONFIRMED: "confirmed",
    PARTIALLY_FILLED:"partially_filled",
    FILLED:"filled",
    REJECTED:"rejected",
    CANCELED:"canceled",
    FAILED:"failed"
  }

  public static SIDES = {
    BUY: "buy",
    SELL: "sell"
  };
  public data = null;

  public constructor(data){
    this.data = data;
  }
}

export class OrderType{
  public static MARKET = "market";
  public static LIMIT = "limit";
}

export class OrderTimeInForce{
  public static GOOD_TILL_CANCELED = "gtc";
  public static GOOD_FOR_DAY = "gfd";
}

export class OrderTrigger{
  public static IMMEDIATE="immediate";
  public static STOP="stop";
}
