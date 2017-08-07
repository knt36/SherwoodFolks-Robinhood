/**
 * Created by anhle on 8/7/17.
 */
import {Component, Input} from '@angular/core';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent {

    @Input('data') data:any[];
    @Input('label') label:any[];

    // lineChart
    public lineChartData:Array<any> = [
        {
            data: [65.23, 59.99, 80.12, 810.45, 56.23, 55.12, 404.23, 810.45, 56.23, 55.12,65.23, 59.99, 80.12, 810.45, 56.23,],
        }
    ];
    public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '20', '22', '32', '1', '2', '3', '4', '5', '6',];
    public lineChartOptions:any = {
        responsive: true,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        tooltips: {
            position: 'average',
            caretSize: 0,
            cornerRadius: 1,
            bodyFontSize: 11,
            titleFontSize: 11
        }

    };
    public lineChartColors:Array<any> = [
        { //grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            borderWidth: 1,
            pointRadius: 2,
            lineTension: 0
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';

    public chartHovered(e:any):void {
        console.log(e);
    }

}