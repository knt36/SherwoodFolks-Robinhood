/**
 * Created by anhle on 10/28/17.
 */
/**
 * Created by anhle on 8/5/17.
 */

import {Component} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";

@Component({
  selector: 'order-panel',
  templateUrl : './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})


export class OrderPanelComponent{

  pendingOrder = [{
    symbol: 'SQ',
    type: 'market buy',
    avg_cost: '32.43',
    quantity: '23'
  },
    {
      symbol: 'SQ',
      type: 'market buy',
      avg_cost: '32.43',
      quantity: '23'
    }];

  constructor(public rb:RobinhoodService){



  }

}
