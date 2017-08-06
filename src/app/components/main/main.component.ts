import {OnInit, Component} from "@angular/core";
import {RobinhoodDataService} from "../../services/RobinhoodDataService";


@Component({
    templateUrl : 'main.component.html',
    styleUrls: ['main.component.css']
})

export class MainComponent implements OnInit{
  constructor(robinhoodDataService: RobinhoodDataService){

  }
    ngOnInit(){

    }
}
