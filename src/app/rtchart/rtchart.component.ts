import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import * as Highcharts from 'highcharts';

interface dataModel {
    date: string;
    count: string;
}

@Component({
  selector: 'app-rtchart',
  templateUrl: './rtchart.component.html',
  styleUrls: ['./rtchart.component.css']
})
export class RtChartComponent implements OnInit {
    public dataDate; dataCount; dataSet;
    public chartData = []; chartData2 = [];

    HighCharts: typeof Highcharts = Highcharts;
    chartConstructor = 'chart';
    updateFlag = false;
    chartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: null
        },
        time: {
            useUTC: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            labels: {
              formatter() {
                return Highcharts.dateFormat('%e %b %y', this.value);
              }
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Total Data'
            }
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: true,
                    radius: 4
                }
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            marker: {
                                radius: 2.5
                            }
                        }
                    }
                }
            }]
        }
    };

    constructor(
        public socks: SocketService
    ) { }

    conn = this.socks.SocketConnection();
    ngOnInit() {
        this.getData();
    }

    getData() {
        const self = this;

        this.conn.subscribe( x => {
            this.dataSet = x;
            this.dataDate = new Date(this.dataSet.date);
            this.dataCount = this.dataSet.count;

            this.chartData2.push({
                x: this.dataDate.toLocaleDateString('id-ID'),
                y: this.dataCount
            });

            this.chartData.push({
                x: this.dataDate.getTime(),
                y: this.dataCount
            });

            // @ts-ignore
            this.chartOptions.series = [{
                marker: {
                    symbol: 'square'
                },
                name: 'Count',
                data: this.chartData
            }];

            // this.chartOptions.series[0] = {
            //
            //     data: (function() {
            //         // generate an array of random data
            //         const data = [];
            //         const time = (new Date()).getTime();
            //         let i;
            //
            //         for (i = -19; i <= 0; i += 1) {
            //             data.push({
            //                 x: self.dataDate,
            //                 y: self.dataCount
            //             });
            //         }
            //         return data;
            //     })
            // };

            // @ts-ignore
            // Highcharts.chart('chart-container', this.chartOptions);

            this.updateFlag = true;
        });
    }

    requestData() {
        // const series = this.chartOptions.series[0];
        // const shift = series.data.length > 20;
    }
}
