/**
 * Created by anhle on 11/1/17.
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import {StockModule} from "../../model/Stock.model";
import Stock = StockModule.Stock;
import {RobinhoodService} from "../../services/RobinhoodService";
import StockType = StockModule.StockType;
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'stock-panel',
  templateUrl : './stock-panel.component.html',
  styleUrls: ['./stock-panel.component.scss']
})


export class StockPanelComponent{

  @Input('stock') stock: Stock;
  @Output()
  panelEvent:EventEmitter<string> = new EventEmitter();


  constructor(public notification:NotificationsService, public rb:RobinhoodService){
  }

  closePanel(){
    this.panelEvent.emit('closePanel');
    console.log("close stock panel");
  }
}
