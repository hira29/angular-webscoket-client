import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import { Chart } from 'angular-highcharts';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rtchart',
  templateUrl: './rtchart.component.html',
  styleUrls: ['./rtchart.component.css']
})
export class RtChartComponent implements OnInit {
    public dataDate; dataCount; dataSet; iterate = 0; flags = true;
    public chartData = []; chartData2 = [];

    chart = new Chart({
        chart: {
            type: 'spline',
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Linechart'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },

        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },
        // @ts-ignore
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                    data.push({
                        x: time + i * 1000,
                        y: Math.random() * 100
                    });
                return data;
            }())
        }]
    });

    private subscriptions: Array<Subscription> = [];

    constructor(
        public socks: SocketService
    ) { }

    conn = this.socks.SocketConnection();
    ngOnInit() {
        this.getData();
    }
    onBtnClick() {
        if (this.flags) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            });
            this.flags = false;
        } else {
            this.ngOnInit();
            this.flags = true;
        }
    }
    getData() {
        this.socks.testcon$.subscribe(x => {
            this.dataSet = x;
            this.dataDate = new Date(this.dataSet.date);
            this.dataCount = this.dataSet.count;

            this.chartData2.push({
                x: this.dataDate.toLocaleDateString('id-ID'),
                y: this.dataCount
            });
            if (this.iterate > 20) {

                this.chart.addPoint([this.dataDate.getTime(), this.dataCount], 0, true, true);
            } else {
                this.chart.addPoint([this.dataDate.getTime(), this.dataCount], 0, true, false);
                this.iterate = this.iterate + 1;
            }

            return;
        }));
    }

    requestData() {
        // const series = this.chartOptions.series[0];
        // const shift = series.data.length > 20;
    }
}
