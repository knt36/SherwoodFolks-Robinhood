/**
 * Created by anhle on 8/7/17.
 */
import { Component, Input} from '@angular/core';
import {GoogleChartComponent} from "./GoogleChartComponent";
import {GraphData} from "../../model/Historical.model";

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent extends GoogleChartComponent {

    private chart: any;
    private options: any;
    private data:any;

    @Input('data') historicals:GraphData;
    @Input('symbol') symbol:string;

    constructor() {
        super();
    }

    drawGraph() {

        if(this.historicals){
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
                    //baselineColor: 'none',
                    ticks: [this.historicals.closePrice],
                    textPosition: 'none'
                }
                //chartArea: {left:0,top:0,width:'100%',height:'100%'}

            };

            this.chart = this.createLineChart(document.getElementById('stock-chart' + this.symbol));
            this.chart.draw(this.data, this.options);
        }

    }
}
