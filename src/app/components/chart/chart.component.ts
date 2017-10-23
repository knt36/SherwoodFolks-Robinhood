/**
 * Created by anhle on 8/7/17.
 */
import { Component, Input, OnChanges} from '@angular/core';
import {GoogleChartComponent} from "./GoogleChartComponent";
import {GraphData} from "../../model/Historical.model";

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent extends GoogleChartComponent implements OnChanges{

    private chart: any;
    private options: any;
    private data:any;

    @Input('data') historicals:GraphData;
    @Input('symbol') symbol:string;

    constructor() {
        super();
    }

    drawGraph() {

        if(this.historicals && this.historicals.data){
            let table = this.historicals.data.map((x, i) => [i, x]);
            table.unshift(['Time', 'Stock']);


            this.data = this.createDataTable(table);

            console.log('drawing the chart');

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
        this.drawGraph();
    }
}
