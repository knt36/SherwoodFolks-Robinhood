/**
 * Created by anhle on 10/28/17.
 */
/**
 * Created by anhle on 8/5/17.
 */

import {Component, OnChanges, OnInit} from "@angular/core";
import {RobinhoodService} from "../../services/RobinhoodService";
import {OrderModule} from "../../model/Order.model";
import Order = OrderModule.Order;
import {Constant} from "../../model/constant";

@Component({
  selector: 'order-panel',
  templateUrl : './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})


export class OrderPanelComponent implements OnInit, OnChanges{

  pendingOrder = [{
    symbol: 'SQ',
    type: 'market buy',
    avg_cost: '32.43',
    quantity: '23',
    status: 'Pending',
    color: 'gray'
  },
    {
      symbol: 'SQ',
      type: 'market buy',
      avg_cost: '32.43',
      quantity: '23',
      status: 'Pending',
      color: 'gray'
    }];

  recentOrder = [
    {
      symbol: 'SQ',
      type: 'market buy',
      avg_cost: '32.43',
      quantity: '23',
      status: 'Filled',
      color: 'green'
    },{
      symbol: 'SQ',
      type: 'market buy',
      avg_cost: '32.43',
      quantity: '23',
      status: 'Canceled',
      color: 'brown'
    },{
      symbol: 'SQ',
      type: 'market buy',
      avg_cost: '32.43',
      quantity: '23',
      status: 'Canceled',
      color: 'brown'
    }
  ];

  legend:any = {
    queued : {name: "Pending" , color: "gray"},
    unconfirmed : {name: "Pending", color: "gray"},
    confirmed : {name: "Pending", color: "gray"},
    partially_filled : {name: "Partially filled", color: "yellow"},
    filled : {name: "Filled", color: "green"},
    rejected : {name: "Rejected", color: "red"},
    canceled : {name: "Canceled", color: "brown"},
    failed : {name: "Failed", color: "orange"},
  };

  showPurchase:boolean = true;
  showPendingOrder:boolean = true;

  constructor(public rb:RobinhoodService){

  }

  ngOnInit(){

  }

  ngOnChanges(){
    const orders = this.rb.account.recentOrders;
    const pendingOrder = [];
    const recentOrder = [];
    orders.forEach(item =>{
      const o:Order = item;
      if(o.state === Constant.State.QUEUED){
        pendingOrder.push(o);
      }else{
        recentOrder.push(o);
      }
    })

    this.pendingOrder = pendingOrder;
    this.recentOrder = recentOrder;
  }

  togglePendingGroup(){
    this.showPendingOrder = !this.showPendingOrder;
  }

  togglePurchaseGroup(){
    this.showPurchase = !this.showPurchase;
  }

}
