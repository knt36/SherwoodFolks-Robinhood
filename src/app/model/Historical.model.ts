/**
 * Created by anhle on 10/18/17.
 */
import {Constant} from "./constant";

export class Historical{

    public static QUERY = {
        INTERVAL: 'interval',
        SPAN: 'span',
        BOUND: 'bounds'
    };

    public static INTERVAL = {
        WEEK: 'week',
        DAY: 'day',
        TEN_M: '10minute',
        FIVE_M: '5minute',
        ALL: null
    };

    public static SPAN = {
        DAY: 'day',
        WEEK: 'week',
        YEAR: 'year',
        FIVE_Y: '5year',
        ALL: 'all'
    };

    public static BOUNDS = {
        EXTENDED: 'extended',
        REGULAR: 'regular',
        TRADING: 'trading'
    };

    public static DATA = {
        CLOSE_PRICE : 'previous_close_price',
        DATA : 'historicals',
        PRICE: 'close_price'
    };
};

export class GraphData{
    public closePrice = null;
    public data= [];
    public color= null;

    public constructor(data){
        this.closePrice = Number(data[Historical.DATA.CLOSE_PRICE]);
        this.data = data[Historical.DATA.DATA].map(x => Number(x[Historical.DATA.PRICE]));
        this.updateColor();
    }

    public updateData(data){
        this.data.push(data);
        this.updateColor();
    }

    public updateColor(){
        this.color = this.data[this.data.length-1] >= this.closePrice ? Constant.COLOR.GAIN : Constant.COLOR.LOSS;

    }

};

