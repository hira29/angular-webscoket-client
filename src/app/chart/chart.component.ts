import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private inputData;
  private chartData: any[] | { x: number; y: any; }[];

  options = {
    chart: {
      zoomType: 'x'
    },
    title: {},
    series: [],
    xAxis: {
      type: 'datetime',
      labels: {
        formatter() {
          return HighCharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    tooltip: {
      crosshairs: true,
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
      private conn: ApiService,
  ) { }

  ngOnInit() {
    this.getData();

    setTimeout(() => {
      this.restart();
    }, 300000);
  }

  getData() {
    const self = this;
    this.chartData = [];
    this.conn.getService().subscribe(x => {
      this.inputData = x;

      // Dynamic title
      const textTitle = this.inputData.daterange;
      const year1 = textTitle.substr(0, 4);
      const month1 = textTitle.substr(4, 2);
      const day1 = textTitle.substr(6, 2);
      const date1 = day1 + '/' + month1 + '/' + year1;
      const year2 = textTitle.substr(11, 4);
      const month2 = textTitle.substr(15, 2);
      const day2 = textTitle.substr(17, 2);
      const date2 = day2 + '/' + month2 + '/' + year2;
      this.options.title = {
        text: 'Data ' + date1 + ' - ' + date2
      };

      // Get data and insert into series
      for (const value of this.inputData.data) {
        const date = new Date(value.date);
        this.chartData.push({
          x: date.getTime(),
          y: value.count
        });
      }
      this.options.series[0] = {
        name: 'Value',
        marker: {
          symbol: 'square'
        },
        data: this.chartData,
        type: 'line'
      };

      // @ts-ignore
      // Render chart to HTML
      HighCharts.chart('container', this.options);
    });
  }

  restart() {
    this.ngOnInit();
  }
}
