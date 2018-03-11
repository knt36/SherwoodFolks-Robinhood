/**
 * Created by anhle on 10/28/17.
 */
/**
 * Created by anhle on 8/5/17.
 */

import {Component} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";
import {NotificationsService} from "angular2-notifications/dist";
import {Constant} from '../../model/constant';

@Component({
  selector: 'order-panel',
  templateUrl : './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})


export class OrderPanelComponent{

  showPurchase:boolean = true;
  showPendingOrder:boolean = true;

  constructor(public rb:RobinhoodService, public notify:NotificationsService){
  }

  togglePendingGroup(){
    this.showPendingOrder = !this.showPendingOrder;
  }

  togglePurchaseGroup(){
    this.showPurchase = !this.showPurchase;
  }

  cancelOrder(order){
    this.notify.info(Constant.Messages.PENDING.CANCEL_ORDER.Title,
      Constant.Messages.PENDING.CANCEL_ORDER.Detail(order.display.symbol, order.display.type));

    this.rb.cancelOrder(order);

  }

}
