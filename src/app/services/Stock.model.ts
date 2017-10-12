/**
 * Created by roy_f on 9/4/2017.
 */
export class Stock{
  public data = null;

  public constructor(data){
    this.data = data;
  }

  getCurrentPrice(){
    return(this.data.instrument.quote.ask_price);
  }
}
