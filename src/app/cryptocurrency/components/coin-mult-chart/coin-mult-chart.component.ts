import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartPluginsOptions, ChartType } from 'chart.js';

import { BaseChartDirective, Color, Label } from 'ng2-charts';

import pluginAnnotations from 'chartjs-plugin-annotation';

import pluginDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-coin-mult-chart',
  templateUrl: './coin-mult-chart.component.html',
  styleUrls: ['./coin-mult-chart.component.scss']
})
export class CoinMultChartComponent implements OnInit {
  @Input() chartData: ChartDataSets[];
  @Input() chartLabels: Label[];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[]
  public lineChartOptions: (ChartOptions & { annotation: any } & { interaction: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        distribution: 'series',
      }],
      yAxes: [{
        id: 'y-axis-0',
        position: 'left',
        ticks: {
          beginAtZero: true,
          fontColor: 'black',
        }
      }]
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    annotation: {
      drawTime: 'beforeDatasetsDraw',
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '1/1/2021',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: '2021',
            position: 'top'
          }
        },
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '1/1/2020',
          borderColor: 'yellow',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'yellow',
            content: '2020',
            position: 'top'
          }
        },
        /*  {
         type: 'box',
         id: 'a-box-1',
         yScaleID: 'y-axis-0',
         yMin: 0,
         yMax: 1,
         backgroundColor: '#4cf03b'
       }, {
         type: 'box',
         id: 'a-box-2',
         yScaleID: 'y-axis-0',
         yMin: 1,
         yMax: 2.7,
         backgroundColor: '#fefe32'
       }, {
         type: 'box',
         id: 'a-box-3',
         yScaleID: 'y-axis-0',
         yMin: 2.7,
         yMax: 5,
         backgroundColor: '#fe3232'
       } */
      ]
    },
    title: {
      text: 'Valor histórico',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
    },
    legend: {
      position: 'bottom',
    }
  };
  public lineChartColors: Color[] = [
    { // Euro - Azul
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,1)'
    },
    { // Asia - Rojo
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,1)'
    },
    { // Emerging Markets - Amarillo
      backgroundColor: 'rgba(255,255,0,0.2)',
      borderColor: 'rgba(255,255,0,1)',
      pointBackgroundColor: 'rgba(255,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,0,1)'
    },
    { // Latin America - Verde
      backgroundColor: 'rgba(0,255,0,0.2)',
      borderColor: 'rgba(0,255,0,1)',
      pointBackgroundColor: 'rgba(0,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,255,0,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins: ChartPluginsOptions[] = [pluginAnnotations];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {

  }

  ngOnInit() {
    this.lineChartData = this.chartData;
    this.lineChartLabels = this.chartLabels;
  }

}
