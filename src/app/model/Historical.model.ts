/**
 * Created by anhle on 10/18/17.
 */
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
        HIGH_PRICE: 'high_price'
    };
};

export class GraphData{
    public closePrice = null;
    public data = [];

    public constructor(price){
        this.closePrice = price;
    }

};

