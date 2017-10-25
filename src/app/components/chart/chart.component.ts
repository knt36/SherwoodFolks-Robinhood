/**
 * Created by anhle on 8/7/17.
 */
import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import {GraphData} from "../../model/Historical.model";
import {Constant} from "../../model/constant";
import {RobinhoodService} from "../../services/RobinhoodService";

declare var google:any;

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent implements OnInit, OnDestroy{

    private chart: any;
    private options: any;
    private data:any;
    private isInitialized:boolean;
    private googleLoaded:any;
    public idRandom = Math.random();
    private historicals:GraphData;
    private lastUpdateTime:Date;
    private nextUpdateTime:Date;
    public graphOptions:any = {
        interval: Constant.Graph.INTERVAL.FIVE_M,
        span: Constant.Graph.SPAN.DAY,
        bound: Constant.Graph.BOUND.REGULAR
    };
    private getGraphInterval:any;

    // change this variable as later we allow users to choose their own settings
    private graphInterval:number = (5*60*1000);

    @Input('symbol') symbol:string;


    constructor(public rb:RobinhoodService){
    }

    ngOnInit() {
        if(!this.googleLoaded) {
            this.googleLoaded = true;
            google.charts.load('current',  {packages: ['corechart', 'bar']});
        }
        google.charts.setOnLoadCallback(() => {
            this.updateGraph();
            // this.getGraphInterval = setInterval(() => {
            //     this.updateGraph();
            // }, this.graphInterval);
        });

    }

    ngOnDestroy(){
        clearInterval(this.getGraphInterval);
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

            this.chart = this.createLineChart(document.getElementById('stock-chart' + this.symbol + this.idRandom));
            this.chart.draw(this.data, this.options);

        }

    }

    updateGraph(){
        console.log('draw chart');
        this.rb.getHistoricalsData(this.symbol, this.graphOptions).then( x => {
            this.historicals = x;
            this.drawGraph();
        });
    }
}
