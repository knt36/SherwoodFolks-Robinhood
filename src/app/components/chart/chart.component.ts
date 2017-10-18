/**
 * Created by anhle on 8/7/17.
 */
import { Component, Input} from '@angular/core';
import {GoogleChartComponent} from "./GoogleChartComponent";
import {GraphData} from "../../services/Historical.model";

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent extends GoogleChartComponent {

    private chart: any;
    private options: any;
    private data:any;

    @Input('data') historicals:GraphData;

    constructor() {
        super();
    }

    drawGraph() {
        console.log("draw chart");

        let table = this.historicals.data.map((x, i) => [i, x]);
        table.unshift(['Time', 'Stock']);

        console.log(table);

        this.data = this.createDataTable(table);

        console.log(this.data);
        console.log(this.historicals.closePrice);

        this.options = {
            legend: 'none',
            colors: ['green'],
            lineWidth: 1,
            hAxis: {
                baselineColor: 'none',
                ticks: []
            },
            vAxis: {
                baselineColor: 'none',
                ticks: []
            }
        };

        this.chart = this.createLineChart(document.getElementById('stock-chart'));
        this.chart.draw(this.data, this.options);
    }
}