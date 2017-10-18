/**
 * Created by anhle on 10/18/17.
 */
import { Component, OnInit} from '@angular/core';
declare var google:any;
@Component({
    selector: 'chart',
    template: ''
})
export class GoogleChartComponent implements OnInit {
    private static googleLoaded:any;

    constructor(){
    }

    getGoogle() {
        return google;
    }
    ngOnInit() {
        console.log('ngOnInit');
        if(!GoogleChartComponent.googleLoaded) {
            GoogleChartComponent.googleLoaded = true;
            google.charts.load('current',  {packages: ['corechart', 'bar']});
        }
        google.charts.setOnLoadCallback(() => this.drawGraph());
    }

    drawGraph(){
    }

    createLineChart(element:any):any {
        return new google.visualization.LineChart(element);
    }

    createDataTable(array:any[]):any {
        return google.visualization.arrayToDataTable(array);
    }
}