/**
 * Created by anhle on 8/7/17.
 */
import { Component, Input, OnChanges} from '@angular/core';
import {GraphData} from "../../model/Historical.model";
declare var google:any;

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent implements OnChanges{

    private chart: any;
    private options: any;
    private data:any;
    private isInitialized:boolean;
    private googleLoaded:any;

    @Input('data') historicals:GraphData;
    @Input('symbol') symbol:string;


    constructor(){
    }

    ngOnInit() {
        if(!this.googleLoaded) {
            this.googleLoaded = true;
            google.charts.load('current',  {packages: ['corechart', 'bar']});
        }
        google.charts.setOnLoadCallback(() => this.drawGraph());

    }


    createLineChart(element:any):any {
        return new google.visualization.LineChart(element);
    }

    createDataTable(array:any[]):any {
        return google.visualization.arrayToDataTable(array);
    }

    drawGraph() {

        if(this.historicals && this.historicals.data){
            let table = this.historicals.data.map((x, i) => [i, x]);
            table.unshift(['Time', 'Stock']);
            this.data = this.createDataTable(table);

            this.options = {
                legend: 'none',
                colors: [this.historicals.color],
                lineWidth: 1,
                hAxis: {
                    baselineColor: 'none',
                    ticks: []
                },
                vAxis: {
                    ticks: [this.historicals.closePrice],
                    textPosition: 'none'
                }

            };

            this.chart = this.createLineChart(document.getElementById('stock-chart' + this.symbol));
            this.chart.draw(this.data, this.options);

        }

    }

    ngOnChanges(){
        if(this.googleLoaded){
            google.charts.setOnLoadCallback(() => this.drawGraph());
        }
    }
}
